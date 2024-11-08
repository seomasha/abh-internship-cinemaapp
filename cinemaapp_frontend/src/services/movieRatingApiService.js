import axios from "axios";
import ErrorHandler from "./errorHandler";

const OMDB_API_URL = import.meta.env.VITE_OMDB_URL;

const getMovieRatings = async (movieName) => {
  try {
    const response = await axios.get(OMDB_API_URL, {
      params: {
        apikey: import.meta.env.VITE_OMDB_API_KEY,
        t: movieName.replace(" ", "+"),
      },
    });
    return response.data;
  } catch (error) {
    ErrorHandler.handleError(error);
  }
};

export default {
  getMovieRatings,
};
