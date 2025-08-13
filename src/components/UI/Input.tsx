
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
            className="ring-1 ring-gray-500 px-2 text-white h-fit py-1.5 text-sm w-full rounded-tl-lg rounded-br-lg outline-none">
            </input>
        </div>
    )
};

export default Input;
