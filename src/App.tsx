import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Startseite from './pages/Startseite.tsx';
import Leistungen from './pages/Leistungen';
import Beratung from './pages/Beratung.tsx';
import MetallForm from './pages/MetallForm.tsx';
import Impressum from './pages/Impressum.tsx';
import Datenschutz from './pages/Datenschutz.tsx';
import AGB from './pages/Agb.tsx';

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
            <Route path="/impressum" element={<Impressum />} />
            <Route path="/datenschutz" element={<Datenschutz />} />
            <Route path="/agb" element={<AGB />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App