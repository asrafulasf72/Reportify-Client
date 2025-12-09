import React from 'react'
import Banner from '../Banner/Banner';
import Features from '../Features/Features';
import HowItWork from '../How Work/HowItWork';
import WhyChoose from '../How Work/WhyChoose';
import StatsSection from '../How Work/StatsSection';

 const Home = () => {
  return (
    <div>
        <Banner/>
        <Features/>
        <HowItWork/>
        <WhyChoose/>
        <StatsSection/>
        
    </div>
  )
}
export default Home;