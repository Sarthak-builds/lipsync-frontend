interface ButtonProps {
    type: 'button' | 'submit'| 'reset';
    text: string | number ;
    onClick? : () => void;
}

const ButtonRed: React.FC<ButtonProps> = ({type, text, onClick}) => {

    return (
        <button type={type} onClick={onClick} className="px-5 py-1  border-1 border-red-600 bg-red-500/70 rounded-sm text-md text-center  w-fit min-w-35 max-h-10 hover:bg-red-500">{text}</button>
    )
}

export default ButtonRed;