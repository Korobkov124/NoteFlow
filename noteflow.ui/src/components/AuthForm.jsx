const AuthForm = ({title, children}) => {
    return(
        <div>
            <h2>{title}</h2>
            {children}
            <button type="Submit">Подтвердить</button>
        </div>
    );
}

export default AuthForm;