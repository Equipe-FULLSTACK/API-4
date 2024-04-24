import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import routes, { AppRoute } from '../src/routes/routesConfig';
import LoginPage from '../src/pages/login/loginPage'

function App() {
  return (
    <Router>
      <Routes>
        {/* Defina a rota da página de login como a rota padrão */}
        <Route path="/" element={<LoginPage />} />
        {/* Mapeie as outras rotas do seu aplicativo */}
        {routes.map((route: AppRoute, index: number) => (
          <Route
            key={index}
            path={route.path}
            element={<route.component />}
          />
        ))}
      </Routes>
    </Router>
  );
}

export default App;
