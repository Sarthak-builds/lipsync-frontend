import { useState } from "react";
import Input from "../UI/Input";
import Button from "../UI/Button";
import { useAuthStore } from "../../stores/authStore";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { AuroraBackground } from "../UI/aurora-background";


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
       await login({email, password}); //use swagger for it
    } catch (error) {
      console.log("Login Failed", error);
    }
     navigate('/');
   }

    return (
         <AuroraBackground>
        <div className="z-20 text-white flex justify-center items-center w-full h-screen font-grotesk">
            <form onSubmit={handleSubmit} className="flex flex-col gap-5 px-6 py-5 rounded-tl-3xl rounded-br-3xl  ring-2 ring-gray-500 border-gray-500  justify-between w-170 h-fit">
                <div className="flex flex-col justify-center">
                    <h2 className="text-3xl font-bold text-white/90">Welcome Back  <span className="px-2">(⌐■_■)</span></h2>
                {/* <p className="text-left text-gray-300">We missed you </p> */}
                </div>

                <div>
                    <div className="flex flex-col gap-1">
                 <h3 className="text-md font-light text-white/80">Email: </h3>
                <Input type="string" name="email" value={email} placeholder="Spongebob@gmail.com" onChange={handleChange}></Input>
                </div>
                <div className="flex flex-col gap-1">
                 <h3 className="text-md font-light text-white/80">Password:</h3>
                <Input type="string" name="password" value={password} placeholder="......" onChange={handleChange}></Input>
                </div>
                </div>

                <div className="w-full flex flex-col items-center justify-center mt-4 gap-2">
                    <Button type="submit" text="Login"></Button>
                    <p className="text-gray-300"> New to Lipsync?{" "}
    <Link to="/register" className="text-indigo-400 hover:underline">
      Create an Account
    </Link></p>
                </div>
            </form>
        </div>
        </AuroraBackground>
    
        // <div className="w-full h-screen flex bg-black text-white justify-center items-center">
        //      <form onSubmit={handleSubmit} className="flex flex-col gap-4  py-4 rounded-xl border-1  justify-center items-center w-100 h-fit ">
        //         <h2 className="">LOGIN FORM</h2>
        //         <Input type="email" name="email" value={email} placeholder="Enter you email" onChange={handleChange}></Input>
        //         <Input type="password" name="password" value={password} placeholder="Enter password" onChange={handleChange}></Input>
        //         <Button type="submit" text="Login"></Button>
        //     </form>
        // </div>
    )
}
export default LoginForm;