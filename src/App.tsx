import './App.css'
import LoginForm from './components/authentication/LoginForm'
import SignupForm from './components/authentication/SignupForm'

function App() {
  return (
    <>
    <div className='flex flex-col w-full h-screen justify-center items-center gap-10 bg-black text-white'>
      <h1>Welcome</h1>
      <SignupForm></SignupForm>
      <LoginForm></LoginForm>
    </div>
    </>
  )
}

export default App
