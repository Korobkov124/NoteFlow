import { useState } from "react";
import Logo from "/src/assets/logo.png";
import Background from "/src/assets/login_background.png";
import { Link } from "react-router-dom";
import AuthForm from "../components/AuthForm.jsx";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService.js"
import "./Login.css"
const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        try {
            const token = await login(email, password);
            localStorage.setItem("token", token);
            navigate("/home");

        } catch (err) {
            console.error("Ошибка:", err);
        }
    };
    
    return (
        <div className="layout">
            <div className="content">

                <div className="logo-overlay">
                    <img src={Logo} alt="Logo" className="logo" />
                    <h1>Note Flow</h1>
                </div>

                <AuthForm title="Авторизация" onSubmit={handleLogin}>
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" placeholder={"Пароль"} value={password} onChange={(e) => setPassword(e.target.value)} />

                    <div className="linkDiv">
                        <p>Нет аккаунта?</p>
                        <Link to="/Register">Регистрация</Link>
                    </div>

                </AuthForm>

            </div>

            <img src={Background} alt="Side" className="side-image" />
        </div>
    )
}

export default Login