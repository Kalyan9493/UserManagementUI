import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../src/components/login/Login';
import Registration from '../src/components/registration/Registration';
import HomePage from '../src/components/home/HomePage';
import Header from '../src/components/Header'
import Footer from '../src/components/Footer'
import Test from '../src/components/testmodule/Test'
import Question from '../src/components/testmodule/Question'
import { AuthProvider } from './AuthContext';


function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/test" element={<Test />} />
          <Route path="/question" element={<Question />} />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;