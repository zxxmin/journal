import './Button.scss'

const Button = ({ text, type, onClick, disabled }) => {
    return (
        <button type='button' onClick={onClick} className={`Btn ${type}`} disabled={disabled}>
            {text}
        </button>
    )
}

export default Button