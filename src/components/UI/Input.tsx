
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
            className="bg-black/70 text-white h-12 w-full  px-4 py-2 rounded-lg">
            </input>
        </div>
    )
};

export default Input;