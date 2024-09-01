import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import "./Home.css";
import Banner from './Banner';
import Card from './Card';
import { useSelector, useDispatch } from "react-redux";
import { listListing } from "../action/listingAction";

const Home = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const listingList = useSelector(state => state.listingList);
  const { error, loading, listings } = listingList;

  useEffect(() => {
    dispatch(listListing());
  }, [dispatch]);

  const handleCardClick = (id) => {
    // Navigate to the BookingPage with the card id
    history.push(`/booking/${id}`);
  };

  return (
    <div className="home">
      <Banner />
      {loading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <h3>{error}</h3>
      ) : (
        <div className="home_section">
          {listings.map((listing) => (
            <Card
              key={listing.id}
              src={listing.img}
              title={listing.title}
              description={listing.description}
              onClick={() => handleCardClick(listing.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;

