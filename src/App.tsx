import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import LoginForm from './components/authentication/LoginForm'
import SignupForm from './components/authentication/SignupForm'
import ProtectedRoute from './routes/ProtectedRoute'
import Dashboard from './pages/DashboardPage'
import { useAuthStore } from './stores/authStore'
import Layout from './routes/Layout'
import VoicePage from './pages/Voices'


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
         </Route>
     
  </Routes>
   </>
  )
}

export default App
