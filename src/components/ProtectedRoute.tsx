import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function ProtectedRoute() {
  const { user, loading } = useAuth()

  if (loading) {
    return <div style={{ padding: '40px', fontFamily: 'system-ui', textAlign: 'center' }}>Loading…</div>
  }

  if (!user) {
    return <Navigate to="/signin" replace />
  }

  return <Outlet />
}