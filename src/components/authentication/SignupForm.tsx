import { useState } from "react";
import Input from "../UI/Input";
import Button from   "../UI/Button";
import { useAuthStore } from "../../stores/authStore";

const SignupForm:React.FC = () => {
const [email, setEmail]= useState('');
const [password, setPassword] = useState('');
const { signup } = useAuthStore();

const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
const {name, value} = e.target;
if(name==="email"){ setEmail(value)};
if(name==="password") {setPassword(value)};
}
const handleSubmit = async (e:React.FormEvent) => {
e.preventDefault();
try {
   await signup({email, password}); 
}catch (error) {
    console.log("Signup Failed:", error);
}
}

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2>Sign Up Form</h2>
                <Input type="email" name="email" value={email} placeholder="Enter you email" onChange={handleChange}></Input>
                <Input type="password" name="password" value={password} placeholder="Enter password" onChange={handleChange}></Input>
                <Button type="submit" text="Signup"></Button>
            </form>
        </div>
    )
}

export default SignupForm;