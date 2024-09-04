const Button = ({ text, type, onClick }) => {
    return (
        <button onClick={onClick} className={`Btn Btn_${type}`}>
            {text}
        </button>
    )
}

export default Button;