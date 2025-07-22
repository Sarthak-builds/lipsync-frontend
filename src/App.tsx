import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import LoginForm from './components/authentication/LoginForm'
import SignupForm from './components/authentication/SignupForm'
import ProtectedRoute from './components/authentication/ProtectedRoute'
import Dashboard from './pages/DashboardPage'
import { useAuthStore } from './stores/authStore'

const App:React.FC = ()=> {
const {isAuthenticated} = useAuthStore();

  return (
   <>
   <Routes>
    <Route path="/login" element={<LoginForm/>}/>;
     <Route path='/register' element= { <SignupForm></SignupForm>}/>;
     <Route path ='/dashboard' element = {
      <ProtectedRoute>
        <Dashboard></Dashboard>
      </ProtectedRoute>
      
      // <Dashboard></Dashboard>
     }/>;
     <Route path='/' element={isAuthenticated? <Navigate to='/dashboard'></Navigate>: <Navigate to="/login"></Navigate>}></Route>
  </Routes>
   </>
  )
}

export default App
