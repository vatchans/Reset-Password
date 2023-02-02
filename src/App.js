import './App.css';
import Login from './Login';
import Dashboard from './Dashboard';
import Resetpassword from './Reset-password';
import Accesstoken from './Access-token';
import Newpassword from './Newpassword';
import Returntologin from './Returntologin';
import Additional_info from './Additional_info';
import Signup from './Signup';
import Edit from './Edit';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
function App() {
  return <BrowserRouter>
  <Routes>
    <Route path="/" element={<Login/>}/>
    <Route path='/signup' element={<Signup/>}/>
    <Route path="/Dashboard" element={<Dashboard/>}/>
    <Route path="/Reset" title="Reset password" element={<Resetpassword/>}/>
    <Route path="/auth" element={<Accesstoken/>}/>
    <Route path="/New" element={<Newpassword/>}/>
    <Route path='/return' element={<Returntologin/>}/>
    <Route path='/additional' element={<Additional_info/>}/>
    <Route path='/Edit' element={<Edit/>}/>
      </Routes>
      <ToastContainer/>
  </BrowserRouter>

}

export default App;
