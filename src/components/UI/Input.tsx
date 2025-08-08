
interface InputProps {
    type: 'string' | 'email' | 'password';
    name?: string;
    value: string;
    placeholder: string;
    onChange: (e:React.ChangeEvent<HTMLInputElement>) => void;
}
//react.fc strictly tells that the it returns a jsx and work as a functional component.
const Input: React.FC<InputProps> = ({type, name, value, placeholder, onChange}) => {

    return(
        <div>
            <input type ={type} name={name} value={value} placeholder={placeholder} onChange={onChange}
            className="bg-white/10 px-2 text-white h-fit py-2 text-md w-full rounded-tl-lg rounded-br-lg outline-none">
            </input>
        </div>
    )
};

export default Input;
