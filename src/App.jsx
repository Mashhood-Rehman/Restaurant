import React , {useState} from 'react'
import Navbar from './components/Navbar'
import UserLocation from './components/UserLocation'
import Slider from './components/Slider'
import Reservation from './components/Reservation'
import PreLoader from './components/PreLoader'
import Product from '../src/components/products/Product'
import Contact from './Contact'
import FastFood from "./components/products/FastFood"
import Desi from './components/products/Desi copy'
import Chinese from './components/products/Chinese'
import Desserts from './components/products/Desserts'
import Drinks from './components/products/Drinks'
import './App.css'
const App = () => {
  const [loading,setLoading]= useState(false)
  const [show, setShow] = useState(true);
  const [cart, setCart] = useState([]);

  return (
    <div>
    
     <Navbar cart={cart} setCart={setCart} size={cart.length} />   
     <Product/>
     <Slider/>
     <FastFood cart={cart} setCart={setCart} />
      <Desi cart={cart} setCart={setCart} />
      <Chinese cart={cart} setCart={setCart} />
      <Desserts cart={cart} setCart={setCart} />
      <Drinks cart={cart} setCart={setCart} />
     <UserLocation loading={loading} setLoading={setLoading} />
     <PreLoader loading={loading} setLoading={setLoading}/>
     <Reservation/>
      <Contact/>
    </div>
  )
}

export default App

