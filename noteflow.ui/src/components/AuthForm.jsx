import "./AuthForm.css"
const AuthForm = ({title, children, onSubmit}) => {
    return(
        <div className="authForm">
            <h2>{title}</h2>
            {children}
            <button onClick={onSubmit}>Подтвердить</button>
        </div>
    );
}

export default AuthForm;