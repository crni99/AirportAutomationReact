import React, { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import AirlineRoutes from './routes/airlineRoutes';
import DestinationsRoutes from './routes/destinationRoutes';
import TravelClassesRoutes from './routes/travelClassesRoutes';
import PassengersRoutes from './routes/passengersRoutes';
import PilotsRoutes from './routes/pilotsRoutes';
import Home from './components/common/Home';
import Header from './components/common/Header';
import HealthCheck from './components/common/HealthCheck';
import Footer from './components/common/Footer';
import { DataContext } from './store/data-context';
import { getAuthToken, getRole } from './utils/auth';

/*
Optimization: 
Look for opportunities to optimize performance, 
such as memoizing context values or using React's useMemo hook to prevent unnecessary re-renders.
*/

function App() {
  const isLoggedIn = getAuthToken() !== null;
  const isUser = getRole() !== null;
  const dataContext = useContext(DataContext);

  return (
    <DataContext.Provider value={dataContext}>
      {isLoggedIn && <Header isUser={isUser} />}
      <div className="container mt-4">
        <div className="row">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/HealthCheck" element={<HealthCheck />} />

            {AirlineRoutes}
            {DestinationsRoutes}
            {TravelClassesRoutes}
            {PassengersRoutes}
            {PilotsRoutes}

          </Routes>
        </div>
      </div>
      <Footer />
    </DataContext.Provider>
  );
}

export default App;