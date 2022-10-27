const LOAD_KEY = "map/load_key";
const LOAD_TRIP_AREA = "map/load_trip_area";

const loadKey = (key) => {
  return {
    type: LOAD_KEY,
    payload: key,
  };
};

// const loadTripArea = (map) => {
//   return {
//     type: LOAD_TRIP_AREA,
//     payload: map,
//   };
// };

export const getKey = () => async dispatch => {
  const res = await fetch("/api/map/key", {
    method: "POST",
  });

  if (res.ok) {
    const data = await res.json();

    dispatch(loadKey(data.googleMapsAPIKey));
  }
};

// export const setTripMap = (tripId) => async (dispatch) => {
//   const res = await fetch(`/api/map/${tripId}`);

//   if (res.ok) {
//     const data = await res.json();

//     dispatch(loadTripArea(data));
//   }
// }

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
