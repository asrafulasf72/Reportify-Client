import React from 'react'
import Banner from '../Banner/Banner';
import Features from '../Features/Features';
import HowItWork from '../How Work/HowItWork';
import WhyChoose from '../How Work/WhyChoose';
import StatsSection from '../How Work/StatsSection';
import LatestResolve from '../LatestResolve';
import FAQ from '../FAQ/FAQ';



 const Home = () => {

  return (
    <div>
        <Banner/>
        <LatestResolve/>
        <Features/>
        <HowItWork/>
        <WhyChoose/>
        <StatsSection/>
        <FAQ />
        
    </div>
  )
}
export default Home;