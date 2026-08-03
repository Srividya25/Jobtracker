import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'
import ProtectedRoute from './components/ProtectedRoute'
import Layout from './components/Layout'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import Dashboard from './pages/Dashboard'
import Kanban from './pages/Kanban'
import Resumes from './pages/Resumes'
import Emails from './pages/Emails'
import ApplicationForm from './pages/ApplicationForm'
import ApplicationDetail from './pages/ApplicationDetail'

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <Routes>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route element={<ProtectedRoute />}>
              <Route element={<Layout />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/kanban" element={<Kanban />} />
                <Route path="/resumes" element={<Resumes />} />
                <Route path="/emails" element={<Emails />} />
                <Route path="/new" element={<ApplicationForm />} />
                <Route path="/app/:id" element={<ApplicationDetail />} />
                <Route path="/app/:id/edit" element={<ApplicationForm />} />
              </Route>
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}
