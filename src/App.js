import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoutes from './components/ProtectedRoutes';
import useAuth from './hooks/useAuth';
import Signup from './components/Signup';
import Login from './components/Login';
import DeleteYachts from './components/admin-ui/DeleteYachts';
import AddYachts from './components/admin-ui/AddYachts';
import Yacht from './components/yachts/Yacht';
import Yachtshow from './components/yachts/Yachtshow';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const { authChecked, loggedIn } = useAuth();

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login loggedIn={loggedIn} />} />
        <Route path="/signup" element={<Signup />} />
        
        <Route element={<ProtectedRoutes isAllowed={loggedIn} authChecked={authChecked} redirectPath="/login" />}>
        <Route path="/add" element={<AddYachts />} />
        <Route path="/delete" element={<DeleteYachts />} />
        <Route path="/yacht/:yacht_id" element={<Yachtshow />} />
        <Route path="/yacht" element={<Yacht />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
