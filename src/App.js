import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import Navbar from './components/common/Navbar';
import Home from './pages/Home';
import Activities from './pages/Activities';
import BloodRequirements from './pages/BloodRequirements';
import Login from './pages/Login';
import MyAttendance from './pages/MyAttendance';
import AdminDashboard from './pages/AdminDashboard';
import Profile from './pages/Profile';
import PrivateRoute from './components/common/PrivateRoute';
import './App.css';

const theme = createTheme({
  palette: {
    primary: {
      main: 'rgb(131, 0, 0)',
    },
    secondary: {
      main: '#00008b',
    },
    background: {
      default: '#ffffff',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/blood-requirements" element={<BloodRequirements />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            } />
            <Route path="/my-attendance" element={
              <PrivateRoute>
                <MyAttendance />
              </PrivateRoute>
            } />
            <Route path="/admin/*" element={
              <PrivateRoute adminOnly={true}>
                <AdminDashboard />
              </PrivateRoute>
            } />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
