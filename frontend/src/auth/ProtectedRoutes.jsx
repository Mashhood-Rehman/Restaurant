import { Navigate, Outlet } from "react-router-dom"
import { useCurrentUser } from "../hooks/useCurrentUser"

const ProtectedRoutes = () => {
    const currentUser = useCurrentUser()
    console.log(currentUser)
    if (!currentUser) {
        return <Navigate to='/' />
    }
    return (
        <>
            {
                (currentUser?.userData?.role === 'superadmin') ?
                    <Outlet />
                    : <Navigate to='/' />
            }
        </>
    )
}

export default ProtectedRoutes