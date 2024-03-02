import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './Pages/LandingPage';
import '../src/App.css'
import Header from './Components/Header';
import MatchInfo from './Pages/MatchInfo';
function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/match-info" element={<MatchInfo />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
