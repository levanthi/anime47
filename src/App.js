import { useEffect, useRef, useState } from 'react';
import { Routes,Route } from 'react-router-dom'
import { createContext } from 'react';

import Admin from './pages/Admin'
import Home from './pages/Home'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import Detail from './pages/Detail'
import Watch from './pages/Watch'
import TopAnime from './Components/TopAnime'
import Slider from './Components/Slider'
import AdvancedFilter from './pages/AdvancedFilter'
import QA from './pages/q&a'
import Login from './Components/Login'
import Favorite from './pages/Favorite'
import './App.css'
import './static/css/grid.css'
import {PATHAPP} from './FunctionSpJs/constant'

export const userContext = createContext()

function App() {
  const isAdmin = useRef(false)
  const [user,setUser] = useState()
  useEffect(()=>{
    const user = JSON.parse(sessionStorage.getItem('anime47User'))
    if(user)
    {
      setUser(user)
    }
    const topAnime = document.querySelector('.topAnime')
    const app = document.querySelector('.app')
    const body = document.querySelector('.body')
    function handle(){
        if(window.innerWidth<1024)
        {
            topAnime.style.display = 'none'
            app.style.display='flex'
            app.style.flexDirection='column'
            body.style.flex='1'
        }
        else{
            topAnime.style.display = 'block'
            app.style.display='block'
        }
    }
    window.addEventListener('resize',handle)
    return ()=>{
        window.removeEventListener('resize',handle)
        topAnime.style.display = 'block'
        app.style.display='block'
    }
  },[])
  return <div className='app'>
    <userContext.Provider value={{user,setUser}}>
    <Navbar/>
    <div className='body'>
      <Routes>
        <Route path={PATHAPP} element={<Slider/>} ></Route>
      </Routes>
      <div className='row content'>
        <div className='col l-8 m-12 c-12'>
        <Routes>
        <Route path={PATHAPP} element={<Home/>} ></Route>
        <Route path={`${PATHAPP}/q&a`} element={<QA/>} />
        <Route path={`${PATHAPP}/filter/:slug/:slug`} element={<AdvancedFilter/>}></Route>
        <Route path={`${PATHAPP}/watch/:slug`} element={<Watch/>}></Route>
        <Route path={`${PATHAPP}/anime/:slug`} element={<Detail/>}></Route>
        <Route path={`${PATHAPP}/china/:slug`} element={<Detail/>}></Route>
        <Route path={`${PATHAPP}/live-action/:slug`} element={<Detail/>}></Route>
        <Route path={`${PATHAPP}/login/:slug`} element={<Login />}></Route>
        <Route path={`${PATHAPP}/favorite`} element={<Favorite/>}></Route>
      </Routes>
        </div>
        <div className='col l-4 m-12 c-12 topAnime'>
          <TopAnime/>
        </div>
      </div>
    </div>
    <Footer/>
  </userContext.Provider>
  </div>
}

export default App
