//import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Startseite from './pages/Startseite.tsx';
import Leistungen from './pages/Leistungen';
import Beratung from './pages/Beratung.tsx';
import MetallForm from './pages/MetallForm.tsx';


function App() {
  return (
    <Router>
      <div className="app">
        <NavBar />
        <main className="app__content">
          <Routes>
            <Route path="/" element={<Startseite />} />
            <Route path="/leistungen" element={<Leistungen />} />
            <Route path="/beratung" element={<Beratung />} />
            <Route path="/metallform" element={<MetallForm />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App

