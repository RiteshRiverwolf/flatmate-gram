import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import Home from './pages/Home';
import Discovery from './pages/Discovery';
import ProfileSetup from './pages/ProfileSetup';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Matches from './pages/Matches';
import Navbar from './components/Navbar';
import Chat from './pages/Chat';

function App() {
  const { user, token, loading } = useContext(AuthContext);

  if (loading) return <div className="h-screen flex items-center justify-center">Loading...</div>;

  // Logic to check if profile is set up
  const isProfileComplete = user?.age && user?.location?.city;

  return (
    <Router>
  {token && <Navbar />} {/* Show Navbar only if logged in */}
  <Routes>
        {/* Landing Page is always visible at the start */}
        <Route path="/" element={!token ? <Home /> : <Navigate to={isProfileComplete ? "/discovery" : "/profile-setup"} />} />
        
        <Route path="/login" element={!token ? <Login /> : <Navigate to="/" />} />
        <Route path="/signup" element={!token ? <Signup /> : <Navigate to="/profile-setup" />} />

        {/* Protected Routes */}
        <Route path="/profile-setup" element={token ? <ProfileSetup /> : <Navigate to="/login" />} />
        <Route path="/discovery" element={token && isProfileComplete ? <Discovery /> : <Navigate to="/profile-setup" />} />
      <Route path="/matches" element={token ? <Matches /> : <Navigate to="/login" />} />
      <Route path="/chat/:id" element={token ? <Chat /> : <Navigate to="/login" />} />
  </Routes>
    </Router>
  );
}

export default App;