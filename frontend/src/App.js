// src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Navbar    from './components/Navbar';
import Feed      from './pages/Feed';
import Login     from './pages/Login';
import Register  from './pages/Register';
import Upload    from './pages/Upload';

function App() {
  return (
    <Router>
      {/* <Navbar /> */}

      <div style={{ paddingTop: '0px' }}>
        <Routes>
          <Route path="/"         element={<Feed />} />
          <Route path="/login"    element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/upload"   element={<Upload />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;