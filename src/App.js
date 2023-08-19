import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Registration from './pages/Registration';
import ProductsCreation from './pages/ProductsCreation';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <div className="App">
    <Routes>
      <Route exact path='/' element={<Home />}/> 
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={ <Registration />} />
      <Route path='/dashboard' element={ <Dashboard />} />
      <Route path='/create' element={<ProductsCreation />} />
    </Routes>
    </div>
  );
}

export default App;
