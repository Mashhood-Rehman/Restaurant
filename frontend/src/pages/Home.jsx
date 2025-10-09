import React, { useEffect } from 'react'
import Hero from '../components/Header/Hero'
import AboutUs from '../sections/AboutUs'
import Product from '../components/products/Product'
import Reservation from '../sections/Reservation'
import Contact from '../sections/Contact'
import Footer from '../components/Footer/Footer'
import { useLocation } from 'react-router-dom'

const Home = () => {

    const location = useLocation();

    useEffect(() => {
        if (location.hash) {
            const id = location.hash.replace("#", "");
            const section = document.getElementById(id);
            if (section) {
                section.scrollIntoView({ behavior: "smooth" });
            }
        }
    }, [location])
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