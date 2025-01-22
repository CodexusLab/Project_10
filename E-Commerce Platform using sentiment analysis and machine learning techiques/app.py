from flask import Flask, render_template, session, redirect, url_for, request
import sqlite3
import csv
from textblob import TextBlob

app = Flask(__name__)
app.secret_key = 'sessions'

# Define routes for each page
@app.route('/')
def home():
    logged_in = session.get('username') is not None
    user_type = session.get('user_type', None)
    return render_template('home.html', logged_in=logged_in, user_type=user_type)

def create_connection():
    return sqlite3.connect('users.db')

def create_buyer_table():
    conn = create_connection()
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS buyers (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL
        )
    ''')
    conn.commit()
    conn.close()

def create_seller_table():
    conn = create_connection()
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS sellers (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            company TEXT NOT NULL,
            company_email TEXT UNIQUE NOT NULL,
            product_type TEXT NOT NULL,
            password TEXT NOT NULL
        )
    ''')
    conn.commit()
    conn.close()

create_buyer_table()
create_seller_table()

@app.route('/register_buyer', methods=['GET', 'POST'])
def register_buyer():
    if request.method == 'POST':
        username = request.form['username']
        email = request.form['email']
        password = request.form['password']
        
        conn = create_connection()
        cursor = conn.cursor()
        cursor.execute('INSERT INTO buyers (username, email, password) VALUES (?, ?, ?)', (username, email, password))
        conn.commit()
        conn.close()
        
        return redirect(url_for('login'))
    
    return render_template('register_buyer.html')

@app.route('/register_seller', methods=['GET', 'POST'])
def register_seller():
    if request.method == 'POST':
        username = request.form['username']
        company = request.form['company']
        company_email = request.form['company_email']
        product_type = request.form['product_type']
        password = request.form['password']
        
        conn = create_connection()
        cursor = conn.cursor()
        cursor.execute('''
            INSERT INTO sellers (username, company, company_email, product_type, password)
            VALUES (?, ?, ?, ?, ?)
        ''', (username, company, company_email, product_type, password))
        conn.commit()
        conn.close()
        
        return redirect(url_for('login'))
    
    return render_template('register_seller.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']

        # Check if the user is a buyer
        conn = create_connection()
        cursor = conn.cursor()
        cursor.execute('SELECT * FROM buyers WHERE username = ? AND password = ?', (username, password))
        buyer = cursor.fetchone()
        conn.close()
        
        if buyer:
            session['username'] = username
            session['user_type'] = 'buyer'
            return redirect(url_for('main'))

        # Check if the user is a seller
        conn = create_connection()
        cursor = conn.cursor()
        cursor.execute('SELECT * FROM sellers WHERE username = ? AND password = ?', (username, password))
        seller = cursor.fetchone()
        conn.close()
        
        if seller:
            session['username'] = username
            session['user_type'] = 'seller'
            return redirect(url_for('main'))
    
        # If no valid user is found, return to login with an error message
        error_message = "Invalid username or password. Please try again."
        return render_template('login.html', error=error_message)
    
    return render_template('login.html')

@app.route('/add_product', methods=['GET', 'POST'])
def add_product():
    if request.method == 'POST':
        product_id = request.form['product_id']
        product_distributer = request.form['product_distributer']
        product_name = request.form['product_name']
        product_category = request.form['product_category']
        product_reviews = request.form['product_reviews']
        product_link = request.form['product_link']

        # Determine the sentiment of the product reviews
        sentiment_analysis = TextBlob(product_reviews)
        sentiment = "Neutral"  # Default sentiment

        if sentiment_analysis.sentiment.polarity > 0:
            sentiment = "Positive"
        elif sentiment_analysis.sentiment.polarity < 0:
            sentiment = "Negative"

        # Add the product details to the CSV file
        with open('D:/ECOMM_FINAL/data/dataset.csv', 'a', newline='') as csvfile:
            csvwriter = csv.writer(csvfile)
            csvwriter.writerow([
                product_id,
                product_distributer,
                product_name,
                product_category,
                product_reviews,
                sentiment,
                product_link,
            ])

        return redirect(url_for('main'))  # Redirect back to the main page after adding the product
    
    return render_template('add_product.html')

@app.route('/main')
def main():
    if 'user_type' in session:
        user_type = session['user_type']
        
        if user_type == 'buyer':
            return render_template('main_buyer.html')  # Render content for buyers
        elif user_type == 'seller':
            return render_template('main_seller.html')  # Render content for sellers
    
    # If user type is not set, redirect to login
    return redirect(url_for('login'))

def fetch_unique_products_by_category(category):
    products = []
    seen_product_names = set()  # Keep track of product names to ensure uniqueness
    
    with open('D:/ECOMM_FINAL/data/dataset.csv', 'r') as csvfile:
        csvreader = csv.reader(csvfile)
        # Read the header row
        header = next(csvreader)
        # Iterate over rows in the CSV
        for row in csvreader:
            product_category = row[3]  # Assuming the 4th column is 'product_category'
            product_name = row[2]  # Assuming the 3rd column is 'product_name'
            
            if product_category.lower() == category.lower() and product_name not in seen_product_names:
                seen_product_names.add(product_name)  # Add to set
                products.append({
                    'product_id': row[0],  # Product ID
                    'product_distributer': row[1],  # Product Distributer
                    'product_name': product_name,  # Product Name
                    'product_category': product_category,  # Product Category
                    'product_reviews': row[4],  # Product Reviews
                    'product_review_sentiment': row[5],  # Review Sentiment
                    'product_link': row[6],  # Product Link
                })
    return products


@app.route('/products_seller/<category>')
def products_by_category_seller(category):
    products = fetch_unique_products_by_category(category)
    return render_template('products_seller.html', category=category, products=products)

@app.route('/products_buyer/<category>')
def products_by_category_buyer(category):
    products = fetch_unique_products_by_category(category)
    return render_template('products_buyer.html', category=category, products=products)

def fetch_product_details(product_name):
    reviews = []
    total_positive_reviews = 0
    total_negative_reviews = 0
    total_neutral_reviews = 0
    product_details = None

    with open('D:/ECOMM_FINAL/data/dataset.csv', 'r') as csvfile:
        csvreader = csv.reader(csvfile)
        # Read the header row
        header = next(csvreader)
        # Iterate over rows in the CSV
        for row in csvreader:
            if row[2].lower() == product_name.lower():  # Product Name column
                # Capture product details if not set yet
                if not product_details:
                    product_details = {
                        'product_id': row[0],
                        'product_distributer': row[1],
                        'product_name': row[2],
                        'product_category': row[3],
                        'product_link': row[6],
                    }
                
                review = row[4]  # Product Reviews
                review_sentiment = row[5]  # Product Review Sentiment

                reviews.append(review)  # Add the review to the list

                if review_sentiment.lower() == 'positive':
                    total_positive_reviews += 1
                elif review_sentiment.lower() == 'negative':
                    total_negative_reviews += 1
                else:
                    total_neutral_reviews += 1
    
    # Calculate total number of reviews and recommendation
    total_reviews = total_positive_reviews + total_negative_reviews + total_neutral_reviews
    recommendation = "Ask others before buying"  # Default recommendation
    
    if total_positive_reviews / total_reviews > 0.7:
        recommendation = "Recommended"
    elif total_positive_reviews / total_reviews < 0.4:
        recommendation = "Not Recommended"

    return {
        'product_details': product_details,
        'reviews': reviews,
        'total_reviews': total_reviews,
        'total_positive_reviews': total_positive_reviews,
        'total_negative_reviews': total_negative_reviews,
        'total_neutral_reviews': total_neutral_reviews,
        'recommendation': recommendation,
    }


@app.route('/analyse_product_seller/<product_name>')
def analyse_product_seller(product_name):
    product_info = fetch_product_details(product_name)
    return render_template(
        'analysis_result_seller.html',
        product_info=product_info
    )

@app.route('/analyse_product_buyer/<product_name>')
def analyse_product_buyer(product_name):
    product_info = fetch_product_details(product_name)
    return render_template(
        'analysis_result_buyer.html',
        product_info=product_info
    )

@app.route('/profile')
def profile():
    if 'username' in session:
        username = session['username']
        user_type = session['user_type']
        
        if user_type == 'buyer':
            conn = create_connection()
            cursor = conn.cursor()
            cursor.execute('SELECT * FROM buyers WHERE username = ?', (username,))
            user = cursor.fetchone()
            conn.close()
        else:
            conn = create_connection()
            cursor = conn.cursor()
            cursor.execute('SELECT * FROM sellers WHERE username = ?', (username,))
            user = cursor.fetchone()
            conn.close()
        
        if user:
            return render_template('profile.html', user=user, user_type=user_type)
    
    return redirect(url_for('login'))

@app.route('/logout')
def logout():
    session.pop('username', None)
    session.pop('user_type', None)
    return redirect(url_for('home'))


@app.route('/submit_review/<product_name>', methods=['POST'])
def submit_review(product_name):
    review_text = request.form.get('review_text')  # Review text from user input
    sentiment_analysis = TextBlob(review_text)

    if sentiment_analysis.sentiment.polarity > 0:
        review_sentiment = "Positive"
    elif sentiment_analysis.sentiment.polarity < 0:
        review_sentiment = "Negative"
    else:
        review_sentiment = "Neutral"

    with open('D:/ECOMM_FINAL/data/dataset.csv', 'r') as csvfile:
        csvreader = csv.reader(csvfile)
        product_details = None

        # Find a matching product to get additional details
        for row in csvreader:
            if row[2] == product_name:  # Assuming product_name is in column 2
                product_details = {
                    "product_id": row[0],
                    "product_distributer": row[1],
                    "product_name": row[2],
                    "product_category": row[3],
                    "product_link": row[6],
                }
                break

    # Add the new review with sentiment to the dataset
    if product_details:
        with open('D:/ECOMM_FINAL/data/dataset.csv', 'a', newline='') as csvfile:
            csvwriter = csv.writer(csvfile)
            csvwriter.writerow([
                product_details["product_id"],
                product_details["product_distributer"],
                product_name,
                product_details["product_category"],
                review_text,
                review_sentiment,
                product_details["product_link"],
            ])

    return redirect(url_for('analyse_product_buyer', product_name=product_name))

@app.route('/product_sentiment_seller/<product_name>')
def product_sentiment_seller(product_name):
    product_info = fetch_product_details(product_name)
    return render_template('product_sentiment_seller.html', product_info=product_info)

@app.route('/product_sentiment_buyer/<product_name>')
def product_sentiment_buyer(product_name):
    product_info = fetch_product_details(product_name)
    return render_template('product_sentiment_buyer.html', product_info=product_info)

@app.route('/analyze_satisfaction', methods=['GET'])
def analyze_satisfaction():
    # Redirect to the product sentiment analysis page
    return redirect(url_for('product_sentiment'))

if __name__ == '__main__':
    app.run(debug=True)