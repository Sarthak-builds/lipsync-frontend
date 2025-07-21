import { useState } from "react";
import Input from "../UI/Input";
import Button from "../UI/Button";
import { useAuthStore } from "../../stores/authStore";
import { useNavigate } from "react-router-dom";


const LoginForm: React.FC = ()=> {
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const {login} = useAuthStore();
const navigate = useNavigate();

   const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
     if(name === "email") {setEmail(value)};
     if(name === "password") {setPassword(value)};
     
   }

   const handleSubmit = async (e:React.FormEvent)=> {
    e.preventDefault();
    try {
       await login({email, password}); //we dont have a backend yet so the fetch will be failed for now
    } catch (error) {
console.log("Login Failed", error);
    }
     navigate('/dashboard');
   }

    return (
        <div className="w-full h-screen flex bg-black text-white justify-center items-center">
             <form onSubmit={handleSubmit} className="flex flex-col gap-4  py-4 rounded-xl border-1  justify-center items-center w-100 h-fit ">
                <h2 className="">LOGIN FORM</h2>
                <Input type="email" name="email" value={email} placeholder="Enter you email" onChange={handleChange}></Input>
                <Input type="password" name="password" value={password} placeholder="Enter password" onChange={handleChange}></Input>
                <Button type="submit" text="Login"></Button>
            </form>
        </div>
    )
}
export default LoginForm;