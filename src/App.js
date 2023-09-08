import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import LoginForm from './LoginRegister/LoginForm';
import ResponsiveDrawer from './Components/Dashboard';
import RegistrationForm from './LoginRegister/RegistrationForm';

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<LoginForm />} exact />
            <Route path="/login" element={<LoginForm />} exact />
        <Route path='/register' element={<RegistrationForm />}/>
      </Routes>
      <ResponsiveDrawer />
    </BrowserRouter>
  );
}

export default App;
