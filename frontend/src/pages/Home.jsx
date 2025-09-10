import React from 'react'
import Hero from '../components/Header/Hero'
import AboutUs from '../sections/AboutUs'
import Product from '../components/products/Product'
import Reservation from '../sections/Reservation'
import Contact from '../sections/Contact'
import Footer from '../components/Footer/Footer'

const Home = () => {
    return (
        <div>

            <Hero />
            <AboutUs />
            <Product />
            <Reservation />
            <Contact />
            <Footer />
        </div>
    )
}

export default Home