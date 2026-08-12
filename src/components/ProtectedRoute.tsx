import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { PageLoader } from './Skeleton'

export default function ProtectedRoute() {
  const { user, loading } = useAuth()

  if (loading) {
    return <PageLoader label="Loading your workspace…" />
  }

  if (!user) {
    return <Navigate to="/signin" replace />
  }

  return <Outlet />
}