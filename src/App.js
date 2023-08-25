import './App.css';
import { Login } from './pages/login';
import { Signup } from './pages/register';
import { Route, Routes, useLocation } from 'react-router-dom';
import { TailSpin } from  'react-loader-spinner'
import { useEffect, useState } from 'react';
import { Header } from './components/header/Header';
import { Home } from './pages/home/home';
import { MovieList } from './components/movieList/movieList';
import { MovieDetails } from './pages/movieDetails/movie';


function App() {
  const [isLoader, setIsLoader] = useState(true);
  const location = useLocation();

  useEffect(() => {
    setTimeout(() => {
      setIsLoader(false);
    }, 50);
  }, [])

  if (isLoader) {
    return (
      <div className="loading">
         <TailSpin
          height="100"
          width="100"
          color="#FFD700"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
        <h2>Loading...</h2>
      </div>
    )
  }

  const shouldRenderHeader = !['/', '/register'].includes(location.pathname);
  return (
    <div className="App">
      {shouldRenderHeader && <Header />}
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/register' element={<Signup/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/movie/:id' element={<MovieDetails/>}/>
        <Route path='/movies/:type' element={<MovieList/>}/>
        <Route path='/*' element={<h1>Error page</h1>}/>
      </Routes>
    </div>
  );
}

export default App;
