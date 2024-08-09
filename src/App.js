// import logo from './logo.svg';
import { Route, Routes } from "react-router-dom";
import "./App.css";

import LandingPage from "./landingpage/LandingPage";
import PropertyDetails from "./PropertyDetails/PropertyDetails";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/properties/:id" element={<PropertyDetails />} />
      </Routes>
    </>
  );
}

export default App;
