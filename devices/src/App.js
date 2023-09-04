import React from 'react'
import './App.css';
import LoginForm from './components/LoginForm';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DeviceList from './components/DeviceList';
import DeviceDetails from './components/DeviceDetails';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';


function App() {

  return (
    <Router>
    <Routes>
      <Route path='/' element={<LoginForm/>} />
      <Route path="devicelist" element={<DeviceList />} />
      <Route path='devicedetails' element={<DeviceDetails />}/>
    </Routes>
  </Router>

  );
}

export default App;
