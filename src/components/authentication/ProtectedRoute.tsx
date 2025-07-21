import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../stores/authStore";

interface ProtectedRouteProps {
    children : React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({children}) => {
const { isAuthenticated } = useAuthStore();
 
if(!isAuthenticated) {
    return <Navigate to='/login' replace></Navigate>;
}
return <>
{children}
</>

}


export default ProtectedRoute;

