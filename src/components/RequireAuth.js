import { useSelector } from 'react-redux'
import { selectUser } from '../store/userSlice'
import { Navigate } from "react-router-dom"

function RequireAuth ({ children }) {
    const user = useSelector(selectUser)

    return user.isAuthenticated === true ? children : <Navigate to="/register" replace />;
}

export default RequireAuth;