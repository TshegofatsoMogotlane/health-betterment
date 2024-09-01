import React from 'react'
import { Button } from '@mui/material'
import "./SearchPage.css"
import SearchResults from './SearchResults'

const SearchPage = () => {
  return (
    <div className="searchPage">
        <div className="serach_page_info">
            <p>62 stays . 26 August to 30 August . 2 guets</p>
            <h1>Stay nearby</h1>
            <Button variant="outlined">Cancell Flexibility</Button>
            <Button variant="outlined">Type of place</Button>
            <Button variant="outlined">Price</Button>
            <Button variant="outlined">Room and beds</Button>
            <Button variant="outlined">More filters</Button>
        </div>
        <SearchResults 
          img="https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTEzMTA3NzgxMzcwNzcxOTUzNQ%3D%3D/original/872f434b-9348-4ff1-8c6f-754fdbab4010.jpeg?im_w=1440&im_q=highq"
          location="Private Room in the center of London"
          title="Stay at this spacious Edwardian House"
          description="1 guest . 1 bedroom . 1 bed . 1.5 shared Bathrooms . wifi . Kitchen . Free Parking"
          star={4.73}
          price="$34/ night"
          total="$133 total"/>
          <SearchResults 
          img="https://a0.muscache.com/im/pictures/miso/Hosting-782615921189136934/original/c67f78f1-5807-449a-9a88-753b7fa62d6a.jpeg?im_w=1440&im_q=highq"
          location="Private Room in the center of London"
          title="Stay at this spacious Edwardian House"
          description="1 guest . 1 bedroom . 1 bed . 1.5 shared Bathrooms . wifi . Kitchen . Free Parking"
          star={3.8}
          price="$34/ night"
          total="$133 total"/>
          <SearchResults 
          img="https://a0.muscache.com/im/pictures/miso/Hosting-694055224756906854/original/76f85a0c-b3e2-4f1d-9aa9-d7838f2393c6.jpeg?im_w=1440&im_q=highq"
          location="Private Room in the center of London"
          title="Stay at this spacious Edwardian House"
          description="1 guest . 1 bedroom . 1 bed . 1.5 shared Bathrooms . wifi . Kitchen . Free Parking"
          star={4.3}
          price="$34/ night"
          total="$133 total"/>
          <SearchResults 
          img="https://a0.muscache.com/im/pictures/be0957a9-da56-47d6-89ca-223b6e75321a.jpg?im_w=1440&im_q=highq"
          location="Private Room in the center of London"
          title="Stay at this spacious Edwardian House"
          description="1 guest . 1 bedroom . 1 bed . 1.5 shared Bathrooms . wifi . Kitchen . Free Parking"
          star={3.1}
          price="$34/ night"
          total="$133 total"/>
    </div>
  )
}

export default SearchPage;