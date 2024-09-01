import { 
    LISTING_LIST_SUCCESS, 
    LISTING_LIST_FAIL, 
    LISTING_LIST_REQUEST 
} from "../types/listingTypes";

export const listingListReducers = (state = { listings: [] }, action) => {
    switch(action.type) {
        case LISTING_LIST_REQUEST:
            return { loading: true, listings: [] };
        case LISTING_LIST_SUCCESS:
            return { loading: false, listings: action.payload };
        case LISTING_LIST_FAIL:
            return { loading: false, error: action.payload, listings: [] };
        default:
            return state;
    }
};
