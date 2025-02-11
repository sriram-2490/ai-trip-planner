// import axios from 'axios';

// const BASE_URL = 'https://maps.googleapis.com/maps/api/place/textsearch/json';

// const API_KEY = import.meta.env.VITE_GOOGLE_PLACE_API_KEY;

// const config = {
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   params: {
//     key: API_KEY,
//     fields: 'photos,displayName,id',
//   },
// };

// export const getPlaceDetails = async (query) => {
//   try {
//     const response = await axios.post(BASE_URL, {
//       ...config,
//       params: { ...config.params, query },
//     });
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching place details:', error);
//     throw error;
//   }
// };
