import React, { useState ,useContext,useEffect} from 'react';
import Navbar from './components/Navbar/Navbar';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import LoginPopup from './components/LoginPopup/LoginPopup'; 
import { StoreContext } from './context/StoreContext';
import 'bootstrap/dist/css/bootstrap.css';



const App = () => {
  const [showLogin, setShowLogin] = useState(false); 
  const { token, setToken } = useContext(StoreContext);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
        setToken(storedToken);
    }
}, [setToken]);

  return (
    <div className='app'>
      <Navbar setShowLogin={setShowLogin} token ={token} /> 
      {showLogin && <LoginPopup setShowLogin={setShowLogin} />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/login" element={<LoginPopup />} />

      </Routes>
    </div>
  );
};

export default App;