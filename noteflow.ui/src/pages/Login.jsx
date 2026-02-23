import Logo from "/src/assets/logo.png";
import Background from "/src/assets/login_background.png";
import { Link } from "react-router-dom";
import AuthForm from "../components/AuthForm.jsx";
import "./Login.css"
const Login = () => {
    return (
        <div className="layout">
            <div className="content">
                <div className="Logo">
                    <img src={Logo} alt="Logo" className="logo" />
                    <h1>Note Flow</h1>
                </div>
                <AuthForm title="Авторизация">
                    <input type="email" />
                    <input type="password" />
                </AuthForm>
            </div>

            <img src={Background} alt="Side" className="side-image" />
        </div>
    )
}

export default Login