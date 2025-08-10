import { useState } from "react";
import Input from "../UI/Input";
import Button from   "../UI/Button";
import { useAuthStore } from "../../stores/authStore";
import { useNavigate } from "react-router-dom";
import { AuroraBackground } from "../UI/aurora-background";
import { Link } from "react-router-dom";


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
   navigate("/login");
} catch (error) {
    console.log("Signup Failed:", error);
}
}

    return (
        <AuroraBackground>
        <div className="z-20 text-white flex justify-center items-center w-full h-screen font-grotesk">
            <form onSubmit={handleSubmit} className="flex flex-col gap-7 px-6 py-5 rounded-tl-3xl rounded-br-3xl  ring-2 ring-gray-500 border-gray-500  justify-between w-150 h-fit">
                <div className="flex flex-col justify-center">
                    <h2 className="text-3xl font-bold text-white/95">Create Account <span className="px-1">◔◡◔</span></h2>
                <p className="text-left text-gray-300">Welcome to Lipsync : Your AI-powered video generation and speech sync tool.</p>
                </div>

                <div>
                    <div className="flex items-center justify-between gap-3">
                 <h3 className="text-md font-light text-white/80">FirstName:</h3>
                <Input type="string" name="firstName" value={first_name} placeholder="Spongebob" onChange={handleChange}></Input>
                 <h3 className="text-md font-light text-white/80">LastName:</h3>
                <Input type="string" name="lastName" value={last_name} placeholder="Squarepants" onChange={handleChange}></Input>
                </div>

                 <div className="flex flex-col gap-1 py-1">
                 <h3 className="text-md font-light text-white/80">Email:</h3>
                <Input type="email" name="email" value={email} placeholder="spongebob@gmail.com" onChange={handleChange}></Input>
                </div>
                 <div className="flex flex-col gap-1 py-1">
                 <h3 className="text-md font-light text-white/80">Password:</h3>
                <Input type="password" name="password" value={password} placeholder="....." onChange={handleChange}></Input>
                </div>
                </div>

                <div className="w-full flex flex-col items-center justify-center mt-4 gap-2">
                    <Button type="submit" text="Signup"></Button>
                    <p className="text-gray-300"> Already have an Account?{" "}
    <Link to="/login" className="text-indigo-400 hover:underline">
      Login
    </Link></p>
                </div>
            </form>
        </div>
        </AuroraBackground>
    )
}

export default SignupForm;