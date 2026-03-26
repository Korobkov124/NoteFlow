import Login from  './pages/Login.jsx'
import Register from "./pages/Register.jsx";
import {Navigate, Route, Routes} from "react-router-dom";
import Home from "./pages/Home.jsx";
const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/Login" />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/Home" element={<Home />} />
        </Routes>
    )
}

export default App;