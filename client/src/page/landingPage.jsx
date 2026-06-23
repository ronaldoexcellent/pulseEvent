import { Feature } from "framer-motion"
import Navbar from "../components/Navbar"
import Hero from "../components/sections/Hero"
import ProductModules from "../components/sections/ProductModule"
import MetricsDashboard from "../components/sections/MetricsDashboard"
import ConversionZone from "../components/sections/ConversionZone"
import Footer from "../components/Footer"



const LandingPage = () => {
  return (
    <main>
   <Navbar/>
   <Hero/>
   <ProductModules/>
   <MetricsDashboard/>
   <ConversionZone/>
   <Footer/>
    </main>
  )
}

export default LandingPage