import './App.css'
import React from 'react';
import { Routes, Route } from "react-router-dom"
import Login from './pages/Login';


const App:React.FC = ()=> (
 <>
    
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      
    </>
)

export default App;
