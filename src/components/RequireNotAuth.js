import { useSelector } from 'react-redux'
import { selectUser } from '../store/userSlice'
import { Navigate } from "react-router-dom"

// eslint-disable-next-line react/prop-types
function RequireAuth ({ children }) {
    const user = useSelector(selectUser)

    // eslint-disable-next-line react/react-in-jsx-scope
    return !user.isAuthenticated === true ? children : <Navigate to="/" replace />;
}

export default RequireAuth;