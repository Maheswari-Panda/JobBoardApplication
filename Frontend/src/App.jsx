import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import AddJob from './components/AddJobForm'
import Navbar from './components/Navbar'
import Spinner from './components/Spinner'
import JobDetails from './components/JobDetails'
// import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar/>
      {/* <Spinner/> */}
    <Routes>
      
      <Route path="/" element={<Home />} />
      <Route path="/add-job" element={<AddJob />} />
      <Route path="/jobs/:id" element={<JobDetails />} />

    </Routes>
    </>
  )
}

export default App
