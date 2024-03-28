import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AirlinesList from './components/airline/AirlinesList';
import AirlineDetails from './components/airline/AirlineDetails';
import AirlineForm from './components/airline/AirlineForm';
import Home from './components/common/Home';
import Header from './components/common/Header';
import HealthCheck from './components/common/HealthCheck';
import Footer from './components/common/Footer';

function App() {
  return (
    <>
      <Header />
      <div className="container mt-4">
        <div className="row">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/HealthCheck" element={<HealthCheck />} />

            <Route path="/airlines" element={<AirlinesList />} />
            <Route path="/airlines/:id" element={<AirlineDetails />} />
            <Route path="/airlines/create" element={<AirlineForm />} />
          </Routes>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;