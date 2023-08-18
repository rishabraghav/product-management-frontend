import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Registration from './pages/Registration';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
    <Routes>
      <Route exact path='/' element={<Home />}/> 
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={ <Registration />} />
    </Routes>
    </div>
  );
}

export default App;
