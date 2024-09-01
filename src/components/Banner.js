import React from 'react'
import Button  from '@mui/material/Button'
import "./Banner.css"

const Banner = () => {
  return (
    <div className="banner">
      <div className="banner_info">
        <h1>Your health is your wealth. Invest wisely.</h1>
        <h3>Your mind matters. Embrace support, find peace.</h3>
        <Button variant="outlined">Best Doctors/Psychologist</Button>
      </div>
    </div>
  )
}

export default Banner

