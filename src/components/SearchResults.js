import React from 'react'
import "./SearchResults.css"
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"

const SearchResults = ({img, location,title, description,star, price, total}) => {
  return (
    <div className="search_results">
        <img src={img} alt=""/>
        <FavoriteBorderIcon className="search_results_heart"/>
        <div className="search_results_info">
            <div className="search_results_info_top">
                <p>{location}</p>
                <h3>{title}</h3>
                <p>----</p>
                <p>{description}</p>
            </div>
            <div className="search_results_info_bottom">
                <div className="search_results_star">
                    <p><strong>{star}</strong></p>
                </div>
                <div className="search_results_price">
                    <h2>{price}</h2>
                    <p>{total}</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default SearchResults