import React from 'react'

import Hero from '../components/hero'
import Homecards from '../components/homecards'
import Joblisting from '../components/joblisting'
import ViewAllJobs from '../components/viewAllJobs'

const title = "Job Lab"
const subtitle = "Weclome to Job Lab. Find the right Job for you"

const home_page = () => {
  return (
    <>
        <Hero title={title} subtitle={subtitle}/>    {/* passing title and subtile to 'Hero' component using probs*/} 
        <Homecards/>
        <Joblisting isHome={true}/>
        <ViewAllJobs/>
    </>
  )
}

export default home_page
