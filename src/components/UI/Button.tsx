interface ButtonProps {
    type: 'button' | 'submit'| 'reset';
    text: string | number ;
    onClick? : () => void;
}

const Button: React.FC<ButtonProps> = ({type, text, onClick}) => {

    return (
        <button type={type} onClick={onClick} className="bg-black text-white px-4 py-2  rounded-lg max-w-50 w-full">{text}</button>
    )
}

export default Button;