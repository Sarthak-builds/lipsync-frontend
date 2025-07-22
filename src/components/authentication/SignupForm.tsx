import { useState } from "react";
import Input from "../UI/Input";
import Button from   "../UI/Button";
import { useAuthStore } from "../../stores/authStore";
import { useNavigate } from "react-router-dom";

const SignupForm:React.FC = () => {
const [email, setEmail]= useState('');
const [password, setPassword] = useState('');
const [first_name, setFirstName] = useState('');
const [last_name, setLastName] = useState('');
const { register } = useAuthStore();
const navigate = useNavigate();

const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
const {name, value} = e.target;
if(name==="email"){ setEmail(value)};
if(name==="password") {setPassword(value)};
if(name==="firstName") {setFirstName(value)};
if(name==="lastName") {setLastName(value)};
}
const handleSubmit = async (e:React.FormEvent) => {
e.preventDefault();
try {
    console.log({first_name, last_name, email, password})
   await register({ first_name, last_name, email, password}); 
   navigate("/dashboard");
} catch (error) {
    console.log("Signup Failed:", error);
}
}

    return (
        <div className="bg-black text-white flex justify-center items-center w-full h-screen">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 px-8 py-4 rounded-xl border-1 justify-center items-center w-100 h-fit">
                <h2>SIGN UP FORM</h2>
                <Input type="string" name="firstName" value={first_name} placeholder="FirstName" onChange={handleChange}></Input>
                <Input type="string" name="lastName" value={last_name} placeholder="LastName" onChange={handleChange}></Input>
                <Input type="email" name="email" value={email} placeholder="Enter you email" onChange={handleChange}></Input>
                <Input type="password" name="password" value={password} placeholder="Enter password" onChange={handleChange}></Input>
                <Button type="submit" text="Signup"></Button>
            </form>
        </div>
    )
}

export default SignupForm;