import './App.css';
import { useEffect } from 'react';
import {useTelegram} from './components/hooks/useTelegram';
import Header from './components/Header/Header';
import {Route, Routes} from 'react-router-dom';
import ProductList from './components/ProductList/ProductList';
import Form from './components/Form/Form';
import Auto from './components/ProductList/Auto';
import Techno from './components/ProductList/Techno';
import Kids from './components/ProductList/Kids';
import Home from './components/ProductList/Home';
import Zoo from './components/ProductList/Zoo';

function App() {
  const {tg} = useTelegram();
  useEffect(() => {
    tg.ready();
  }, [])

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route index element={<ProductList />}/>
        <Route path={'form'} element={<Form />}/>
        <Route path={'1'} element={<Auto />}/>
        <Route path={'2'} element={<Techno />}/>
        <Route path={'3'} element={<Kids />}/>
        <Route path={'4'} element={<Home />}/>
        <Route path={'5'} element={<Zoo />}/>
      </Routes>
    </div>
  );
}

export default App;
