import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import LoginForm from './components/authentication/LoginForm'
import SignupForm from './components/authentication/SignupForm'
import Dashboard from './pages/DashboardPage'
import { useAuthStore } from './stores/authStore'
import Layout from './routes/Layout'
import VoicePage from './pages/Voices'
import Speech from './pages/Speech'
import Videos from './pages/Videos'
import GenerateClips from './pages/GenerateClips'


const App:React.FC = ()=> {
const {isAuthenticated} = useAuthStore();

  return (
   <>
   <Routes>
       <Route path='/register' element= { <SignupForm></SignupForm>}/>;
         <Route path="/login" element={<LoginForm/>}/>;

    <Route path='/' element={isAuthenticated? <Navigate to='/'></Navigate>: <Navigate to="/login"></Navigate>}></Route>;
    
         <Route path='/' element={<Layout></Layout>}>
            <Route index element= {<Dashboard></Dashboard>}></Route>
            <Route path='/voices' element={<VoicePage></VoicePage>}></Route>
            <Route path= '/speech' element={<Speech></Speech>}></Route>
            <Route path= '/videos' element={<Videos></Videos>}></Route>
            <Route path='/Clips' element={<GenerateClips></GenerateClips>}></Route>
         </Route>
     
  </Routes>
   </>
  )
}

export default App
