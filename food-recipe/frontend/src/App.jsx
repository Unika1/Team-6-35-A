import { Routes, Route } from 'react-router-dom';
import Login from './components/public/Login';
import Signup from './components/public/Signup';
import Content from './components/private/Content';
import AboutUs from './components/private/AboutUs';
import Homepage from './components/private/Homepage';
import Navbar from './components/private/Navbar';
import Footer from './components/private/Footer';
import FrontSection from './components/private/FrontSection';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/content" element={<Content />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/frontsection" element={<FrontSection />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
