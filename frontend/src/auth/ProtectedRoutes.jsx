import { Navigate, Outlet } from "react-router-dom"
import { useCurrentUser } from "../hooks/useCurrentUser.jsx"

const ProtectedRoutes = () => {
    const { currentUser, isLoading } = useCurrentUser()

    // 1. IMPORTANT: Wait for the query to finish before deciding what to show.
    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-lg font-semibold text-gray-500">
                    Checking authentication...
                </p>
            </div>
        )
    }

    // 2. If the user is NOT logged in (null), redirect to home.
    if (!currentUser) {
        return <Navigate to='/' />
    }

    // 3. If the user IS logged in, check for Admin permission.
    const isAdmin = currentUser?.userData?.role === 'superadmin'

    return (
        isAdmin ? <Outlet /> : <Navigate to='/' />
    )
}

export default ProtectedRoutes