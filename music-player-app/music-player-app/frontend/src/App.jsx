import "./app.css"
import Header from "./components/Header"
import { BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Login from "./pages/Login"
const App = () => {
  return (
    <>
    <Router>
    <div>
      <Header/>
      <Routes>
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </div>
    </Router>
    </>
  )
}

export default App