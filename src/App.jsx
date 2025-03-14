import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserList from './pages/user/components/UserList';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserList />} /> 
      </Routes>
    </Router>
  );
}

export default App;
