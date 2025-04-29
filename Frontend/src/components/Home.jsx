import React from 'react'
import Navbar from './Navbar'
import AllJobs from './AllJobs'
import JobSearchBar from './JobSearchBar'

function Home() {
  return (
    <>
      <section className='mx-5 lg:mx-50'>
        <AllJobs/>
      </section>
    </>
  )
}

export default Home