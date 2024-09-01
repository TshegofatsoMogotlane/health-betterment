import React, { useState } from 'react'
import "./Search.css"
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css" //theme css file
import { DateRangePicker } from 'react-date-range';
import PeopleIcon from "@mui/icons-material/People"
import { Button } from '@mui/material';

const Search = () => {
  const [startDate, setStartDate]= useState(new Date());
  const [endDate, setEndDate]= useState(new Date());

  const selectionRange ={
    startDate:startDate,
    endDate: endDate,
    key:"selection",
  }
  const handleSelect =(ranges)=>{
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
  }
  return (
    <div className="search">
        <DateRangePicker ranges={[selectionRange]} onChange={handleSelect}/>
        <h2>Number of patience <PeopleIcon/></h2>
        <input min={0} defaultValue={2} type="number"/>
        <Button>Doctor/Psychologist</Button>
    </div>
  )
}

export default Search