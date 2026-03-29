import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "/src/assets/logo.png";
import Background from "/src/assets/login_background.png";
import AuthForm from "../components/AuthForm.jsx";
import { register } from "../services/authService.js";
import "./Login.css"
const Register = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async (e) => {
        try {
            await register(username, email, password);
            navigate("/login");

        } catch (err) {
            console.error(err);
        }
    };
    return (
        <div className="layout">
            <div className="content">

                <div className="logo-overlay">
                    <img src={Logo} alt="Logo" className="logo" />
                    <h1>Note Flow</h1>
                </div>

                <AuthForm title="Регистрация" onSubmit={handleRegister}>
                    <input type="text" placeholder="Имя" value={username} onChange={(e) => setUsername(e.target.value)}/>
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <input type="password" placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)}/>

                </AuthForm>

            </div>

            <img src={Background} alt="Side" className="side-image" />
        </div>
    )
}

export default Register;