import React from 'react';
import Main from './pages/Main/Main';
import { Route, Routes } from 'react-router-dom';
import Busket from './pages/Busket/Busket';
function App() {
  return (
    <Routes>
      <Route path='/' element={<Main />}/>
      <Route path='/busket' element={<Busket />} />
    </Routes>
  )
}

export default App;
