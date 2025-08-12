interface ButtonProps {
    type: 'button' | 'submit'| 'reset';
    text: string | number ;
    onClick? : () => void;
}

const ButtonRed: React.FC<ButtonProps> = ({type, text, onClick}) => {

    return (
        <button type={type}   onClick={onClick} className="inset-shadow-sm inset-shadow-red-500/40 hover:bg-red-500/70  border-red-500 border-2  text-white px-4 py-2  max-w-45 w-full rounded-lg">{text}</button>
    )
}

export default ButtonRed;