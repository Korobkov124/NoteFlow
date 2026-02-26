import Login from  './pages/Login.jsx'
import Register from "./pages/Register.jsx";
import {Route, Routes} from "react-router-dom";
const App = () => {
    return (
        <Routes>
            <Route path="/Login" element={<Login />} />
            <Route path="/Register" element={<Register />} />
        </Routes>
    )
}

export default App;