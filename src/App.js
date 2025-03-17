import './App.css';
import { useEffect } from 'react';
import {useTelegram} from './components/hooks/useTelegram';
import Header from './components/Header/Header';
import {Route, Routes} from 'react-router-dom';
import ProductList from './components/ProductList/ProductList';
import Form from './components/Form/Form';
import Auto from './components/ProductList/1/Auto';

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
      </Routes>
    </div>
  );
}

export default App;
