import { Route, Routes } from 'react-router-dom';
import AirlinesList from './components/airline/AirlinesList';
import AirlineDetails from './components/airline/AirlineDetails';
import AirlineForm from './components/airline/AirlineForm';
import PilotsList from './components/pilot/PilotsList';
import PilotDetails from './components/pilot/PilotDetails';
import Home from './components/common/Home';
import Header from './components/common/Header';
import HealthCheck from './components/common/HealthCheck';
import Footer from './components/common/Footer';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/HealthCheck" element={<HealthCheck />} />

        <Route path="/airlines" element={<AirlinesList />} />
        <Route path="/airlines/:id" element={<AirlineDetails />} />
        <Route path="/airlines/create" element={<AirlineForm />} />

        <Route path="/pilots" element={<PilotsList />} />
        <Route path="/pilots/:id" element={<PilotDetails />} />
        <Route path="/pilots/create" element={<PilotDetails />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;