import { Feature } from "framer-motion"
import Navbar from "../components/Navbar"
import Hero from "../components/sections/Hero"
import ProductModules from "../components/sections/ProductModule"
import FlowSimulator from "../components/sections/FlowSimulator"
import MetricsDashboard from "../components/sections/MetricsDashboard"
import ConversionZone from "../components/sections/ConversionZone"
import Footer from "../components/sections/Footer"


const LandingPage = () => {
  return (
    <main>
   <Navbar/>
   <Hero/>
   <ProductModules/>
   <FlowSimulator/>
   <MetricsDashboard/>
   <ConversionZone/>
   <Footer/>
    </main>
  )
}

export default LandingPage