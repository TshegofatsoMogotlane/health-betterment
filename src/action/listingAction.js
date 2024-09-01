
import { LISTING_LIST_SUCCESS, LISTING_LIST_FAIL, LISTING_LIST_REQUEST } from "../types/listingTypes";
import axios from "axios";

export const listListing = () => async (dispatch) => {
    try {
        dispatch({ type: LISTING_LIST_REQUEST });
        const { data } = await axios.get("http://localhost:5000/listings");
        dispatch({ type: LISTING_LIST_SUCCESS, payload: data });
    } catch (error) {
        // dispatch({type:LISTING_LIST_FAIL, payload : error})
        dispatch({
            type: LISTING_LIST_FAIL,
            payload: error.response && error.response.data.message 
                ? error.response.data.message 
                : error.message,
        });
    }
};
