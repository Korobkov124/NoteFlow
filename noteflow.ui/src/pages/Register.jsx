import Logo from "/src/assets/logo.png";
import Background from "/src/assets/login_background.png";
import AuthForm from "../components/AuthForm.jsx";
import "./Login.css"
const Register = () => {
    return (
        <div className="layout">
            <div className="content">

                <div className="logo-overlay">
                    <img src={Logo} alt="Logo" className="logo" />
                    <h1>Note Flow</h1>
                </div>

                <AuthForm title="Авторизация">
                    <input type="text" placeholder="Имя" />
                    <input type="email" placeholder="Email"/>
                    <input type="password" placeholder="Пароль"/>

                </AuthForm>

            </div>

            <img src={Background} alt="Side" className="side-image" />
        </div>
    )
}

export default Register;