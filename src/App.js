import React, { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import AirlineRoutes from './routes/airlineRoutes';
/* import DestinationsRoutes from './routes/destinationRoutes'; */
import Home from './components/common/Home';
import Header from './components/common/Header';
import HealthCheck from './components/common/HealthCheck';
import Footer from './components/common/Footer';
import { DataContext } from './store/data-context';

function App() {

  const dataContext = useContext(DataContext);

  return (
    <DataContext.Provider value={dataContext}>
      <Header />
      <div className="container mt-4">
        <div className="row">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/HealthCheck" element={<HealthCheck />} />

            {AirlineRoutes}

          </Routes>
        </div>
      </div>
      <Footer />
    </DataContext.Provider>
  );
}

export default App;