import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import StoredCode from './pages/StoredCode';
import FindStoredCode from './pages/FindStoredCode';

function App() {
  return (
    <>
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/snippets/:id" element={<StoredCode />} />
            <Route path="/findstoredcode" element={<FindStoredCode />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
