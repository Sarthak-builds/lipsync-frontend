interface ButtonProps {
    type: 'button' | 'submit'| 'reset';
    text: string | number ;
    onClick? : () => void;
}

const Button: React.FC<ButtonProps> = ({type, text, onClick}) => {

    return (
        <button type={type} onClick={onClick} className="inset-shadow-sm inset-shadow-white/30 bg-black/80  hover:bg-black text-white px-4 py-2  max-w-45 w-full rounded-lg">{text}</button>
    )
}

export default Button;