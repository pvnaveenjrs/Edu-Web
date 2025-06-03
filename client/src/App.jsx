import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import InstitutionList from './components/Institution/InstitutionList';
import InstitutionForm from './components/Institution/InstitutionForm';
import InstitutionView from './components/Institution/InstitutionView';
import PrivateRoute from './components/PrivateRoute';

const App = () => {
  return (
    <Router>
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/institutions" element={
            <PrivateRoute>
              <InstitutionList />
            </PrivateRoute>
          } />

          <Route path="/institutions/new" element={
            <PrivateRoute>
              <InstitutionForm />
            </PrivateRoute>
          } />

          <Route path="/institutions/edit/:id" element={
            <PrivateRoute>
              <InstitutionForm />
            </PrivateRoute>
          } />

          <Route path="/institutions/:id" element={
            <PrivateRoute>
              <InstitutionView />
            </PrivateRoute>
          } />

          <Route path="/" element={<PrivateRoute><InstitutionList /></PrivateRoute>} />
          <Route path="*" element={<p>Page Not Found</p>} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
