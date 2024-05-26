import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import routes, { AppRoute } from '../src/routes/routesConfig';
import LoginPage from '../src/pages/login/loginPage';
import { UserProvider } from './contexts/UserContext';

function App() {
  return (
    <Router>
      {/* Envolver toda a aplicação com o UserProvider */}
      <UserProvider>
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
      </UserProvider>
    </Router>
  );
}

export default App;