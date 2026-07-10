import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Layout from './components/Layout'
import Home from './components/Home'
import Search from './components/Search'
import Detail from './components/Detail'

function App() {
  return (
    // BrowserRouter abilita il routing basato sull'URL del browser
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/cerca" element={<Search />} />
          <Route path="/citta/:lat/:lon" element={<Detail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
