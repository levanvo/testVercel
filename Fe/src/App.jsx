import './App.css';
import { Routes, Route } from "react-router-dom";
import Web from './page/Web';

function App() {
  return (
    <Routes>
      <Route index element={<Web />} />
      <Route path='/' element={<Web />} />
    </Routes>
  )
}

export default App