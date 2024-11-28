import React from 'react';
import { BrowserRouter , Routes, Route, Navigate } from 'react-router-dom';

import Wrapper from './components/Wrapper';

import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Product from './pages/[id]/Product';
import CreateProduct from './pages/CreateProduct';
import Home from './pages/Home';

const isAuthenticated = () => {
    return !!localStorage.getItem('token'); 
};

const App = () => {
    return (
      <BrowserRouter>
        <Wrapper>
          <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                <Route path="/profile" element={isAuthenticated() ? <Profile /> : <Navigate to="/login" />} />

                <Route path="/home" element={isAuthenticated() ? <Home /> : <Navigate to="/login" />} />

                <Route path="/CreateProduct" element={isAuthenticated() ? <CreateProduct /> : <Navigate to="/login" />} />
                <Route path="/:id/product" element={isAuthenticated() ? <Product /> : <Navigate to="/login" />} />

                <Route path="*" element={isAuthenticated() ? <Navigate to="/home" /> :  <Navigate to="/login" />} />
            </Routes>

        </Wrapper>

      </BrowserRouter>
    );
};

export default App;
