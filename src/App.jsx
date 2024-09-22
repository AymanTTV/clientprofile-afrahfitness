import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MiniDrawer from './components/MiniDrawer'; // Adjust the path as needed
import Login from './Login';
import Reports from './components/Reports';
import AddClientForm from './components/AddClientForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/*" element={<MiniDrawer />}>
          <Route path="reports" element={<Reports />} />
          <Route path="add-client" element={<AddClientForm />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
