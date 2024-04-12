import React from 'react';
import { Routes, Route } from "react-router-dom"
import Login from './pages/Login';
import Home from './pages/home/Home';


/*Import de temas css*/
import { ThemeProvider } from 'styled-components';
import GlobalStyle from "./styles/global.ts"
import dark from './styles/themes/Dark.ts';


const App:React.FC = ()=> (
 <>
    <ThemeProvider theme={dark}>
    <GlobalStyle/>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
        </Routes>

    </ThemeProvider>
    </>
)

export default App;
