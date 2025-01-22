import requests
from bs4 import BeautifulSoup

# Function to fetch HTML content from a URL
def fetch_html(url):
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36',
        'Accept-Language': 'en-US, en;q=0.5'
    }
    response = requests.get(url, headers=headers)
    return response.text

# Function to scrape product information
def scrape_product_info(url):
    html_content = fetch_html(url)
    soup = BeautifulSoup(html_content, 'html.parser')

    # Extract product title
    product_title_element = soup.find('h1', class_='product-title')
    product_title = product_title_element.text.strip() if product_title_element else 'N/A'

    # Extract product price
    product_price_element = soup.find('span', class_='product-price')
    product_price = product_price_element.text.strip() if product_price_element else 'N/A'

    # Extract product description
    product_description_element = soup.find('div', class_='product-description')
    product_description = product_description_element.text.strip() if product_description_element else 'N/A'

    # Extract product reviews (if available)
    product_reviews = []
    review_elements = soup.find_all('div', class_='review')
    for review in review_elements:
        review_text = review.find('p', class_='review-text').text.strip()
        product_reviews.append(review_text)

    product_info = {
        'title': product_title,
        'price': product_price,
        'description': product_description,
        'reviews': product_reviews
    }

    return product_info

# Example usage
if __name__ == '__main__':
    product_url = 'https://www.amazon.in/Fire-TV-Stick-Lite-with-all-new-Alexa-Voice-Remote-Lite/dp/B09BY17DLV/ref=sr_1_2?adgrpid=1322714101714665&dib=eyJ2IjoiMSJ9.lwjdarn-0T7gonCseXa9-fNL4Y-dGc_2S0_-EFVE6KhwNf5GO5bxo6OmwzoOvYssG7nrkHvcqwbT7EFE3nfI3h2TpZeaydgUhU7RxcxNY7PdAFQxnddp7k5SJ2HMmvQNetWfdfO1zeaLu4PoIkwqLPJMNv5YTiIpvetzY-tD7T6fTXj89Wal9h9i11EGTRg_InS8lJYlGCNKm1bD6YXR5qxSlTmhq_N4yRnsROkIuUALhWZrDAzEIg71PcMDnW6yCx56p8JM5pBnDZnhjfZ3ddxbJ8Z6r_dlae3CcEJvDvQ.J6HH7OqaB5aAIzffMj5fjFaxD0v43jWk2rWPF9rivZc&dib_tag=se&hvadid=82669897711050&hvbmt=bb&hvdev=c&hvlocphy=157231&hvnetw=o&hvqmt=b&hvtargid=kwd-82670518517893%3Aloc-90&hydadcr=5621_2377279&keywords=amazon+prime&qid=1711257812&sr=8-2'
    product_info = scrape_product_info(product_url)
    print(product_info)