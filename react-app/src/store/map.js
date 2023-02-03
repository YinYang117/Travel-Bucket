const LOAD_KEY = "map/load_key";
const LOAD_TRIP_AREA = "map/load_trip_area";

const loadKey = (key) => {
  return {
    type: LOAD_KEY,
    payload: key,
  };
};

export const getKey = () => async (dispatch) => {
  const res = await fetch("/api/map/key", {
    method: "POST",
  });

  if (res.ok) {
    const data = await res.json();

    dispatch(loadKey(data.googleMapsAPIKey));
  }
};

const initialState = { key: null };

const mapReducer = (state = initialState, action) => {
  let newState = Object.assign({}, state);
  switch (action.type) {
    case LOAD_KEY:
      return { key: action.payload };
    case LOAD_TRIP_AREA:
      newState.trip = action.payload;
      return newState;
    default:
      return state;
  }
};

export default mapReducer;
