import { useEffect, useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import RoutesHandler from './routes';
import { ToastContainer } from 'react-toastify';

import axios from 'axios';
axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;


function App() {
  return (
    <div className="App font-poppins">
      <ToastContainer />
      <Navbar />
      <RoutesHandler />
    </div>
  );
}

export default App;
