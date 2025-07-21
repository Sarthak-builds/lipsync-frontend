interface ButtonProps {
    type: 'button' | 'submit'| 'reset';
    text: string | number ;
    onClick? : () => void;
}

const Button: React.FC<ButtonProps> = ({type, text, onClick}) => {

    return (
        <button type={type} onClick={onClick} className="bg-violet-700 text-white px-4 py-2 w-fit max-w-30">{text}</button>
    )
}

export default Button;