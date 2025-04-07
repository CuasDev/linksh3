import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Stats from './pages/Stats'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Admin from './pages/Admin'
import NotFound from './pages/NotFound'
import ApiDocs from './pages/ApiDocs'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import AdminRegister from './pages/AdminRegister'
import { AuthProvider } from './context/AuthContext'
import './App.css'

function App() {
  return (
    <AuthProvider>
      <div className="app">
        <div className="app-container">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/stats" element={<Stats />} />
              <Route path="/login" element={<Login />} />
              <Route path="/admin/register" element={<AdminRegister />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/api-docs" element={<ApiDocs />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
        <div className="background-animation">
          <div className="light-effect"></div>
        </div>
      </div>
    </AuthProvider>
  )
}

export default App