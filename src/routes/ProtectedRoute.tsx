import { Navigate} from "react-router-dom";
import { useAuthStore } from "../stores/authStore";
import type { ReactNode } from "react";

interface ProtectedRouteType {
    children: ReactNode;
}


const ProtectedRoute: React.FC <ProtectedRouteType> = ({children}) => {
const { isAuthenticated } = useAuthStore();
 
if(!isAuthenticated) {
    return <Navigate to='/login' replace></Navigate>;
}
return <>
{children}
</>

}


export default ProtectedRoute;

