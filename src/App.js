import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoutes from './components/ProtectedRoutes';
import useAuth from './hooks/useAuth';
import Signup from './components/Signup';
import Login from './components/Login';
import WithNav from './components/Navbar/WithNav';
import WithoutNav from './components/Navbar/WithoutNav';
import DeleteYachts from './components/admin-ui/DeleteYachts';
import AddYachts from './components/admin-ui/AddYachts';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const { authChecked, loggedIn } = useAuth();

  return (
    <Router>
      <Routes>
        <Route element={<WithoutNav />}>
          <Route path="/login" element={<Login loggedIn={loggedIn} />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
        <Route element={<WithNav />}>
          <Route element={<ProtectedRoutes isAllowed={loggedIn} authChecked={authChecked} redirectPath="/login" />}>
            <Route path="/" element={<h1 />} />
            <Route path="/add" element={<AddYachts />} />
            <Route path="/delete" element={<DeleteYachts />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
