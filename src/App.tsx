
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ResetPasswordScreen from './views/reset';

function App() {
  return (
    <Router>
      <Routes>
        {/* Muestra ResetPasswordScreen como principal */}
        <Route path="/" element={<ResetPasswordScreen />} />
      </Routes>
    </Router>
  );
}

export default App;