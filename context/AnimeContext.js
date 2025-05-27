import React, { createContext, useContext, useEffect, useReducer } from "react";

// Types
const Types = {
  GETALLANIMES: "GETALLANIMES",
  SETLOADING: "SETLOADING",
  SETSEARCHQUERY: "SETSEARCHQUERY",
  SETFILTER: "SETFILTER",
  ADDFAVORITE: "ADDFAVORITE",
  REMOVEFAVORITE: "REMOVEFAVORITE",
  RESETLIST: "RESETLIST",
  SETFAVORITES: "SETFAVORITES",
};

// Create context
export const animesContext = createContext();

const initialState = {
  animeList: [],
  favorites: [],
  page: 1,
  hasNextPage: true,
  searchQuery: "",
  currentFilter: "popularity.desc",
  loading: false,
};

const TMDB_API_KEY = "021d724ac74ffe96244cd92eaa2d02c2";

// Reducer
const animesReducer = (state, action) => {
  switch (action.type) {
    case Types.GETALLANIMES:
      return {
        ...state,
        animeList:
          action.payload.page === 1
            ? action.payload.results
            : [...state.animeList, ...action.payload.results],
        page: action.payload.page + 1,
        hasNextPage: action.payload.page < action.payload.total_pages,
        loading: false,
      };
    case Types.SETLOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case Types.SETSEARCHQUERY:
      return {
        ...state,
        searchQuery: action.payload,
        animeList: [],
        page: 1,
        hasNextPage: true,
      };
    case Types.SETFILTER:
      return {
        ...state,
        currentFilter: action.payload,
        animeList: [],
        page: 1,
        hasNextPage: true,
      };
    case Types.ADDFAVORITE:
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };
    case Types.REMOVEFAVORITE:
      return {
        ...state,
        favorites: state.favorites.filter(
          (fav) => fav.id !== action.payload.id
        ),
      };
    case Types.RESETLIST:
      return {
        ...state,
        animeList: [],
        page: 1,
        hasNextPage: true,
      };
    case Types.SETFAVORITES:
      return {
        ...state,
        favorites: action.payload,
      };
    default:
      return state;
  }
};

// Context Provider
export const AnimeContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(animesReducer, initialState);

  const fetchAnime = async (resetList = false) => {
    if (!state.hasNextPage && !resetList) return;

    dispatch({ type: Types.SETLOADING, payload: true });

    try {
      const baseUrl = "https://api.themoviedb.org/3/discover/tv";
      const pageToFetch = resetList ? 1 : state.page;
      let url = `${baseUrl}?api_key=${TMDB_API_KEY}&language=en-US&with_genres=16&sort_by=${state.currentFilter}&page=${pageToFetch}`;

      if (state.searchQuery.trim() !== "") {
        url = `https://api.themoviedb.org/3/search/tv?api_key=${TMDB_API_KEY}&language=en-US&query=${encodeURIComponent(
          state.searchQuery
        )}&page=${pageToFetch}&with_genres=16`;
      }

      const response = await fetch(url);
      const data = await response.json();

      dispatch({
        type: Types.GETALLANIMES,
        payload: {
          results: data.results,
          page: pageToFetch,
          total_pages: data.total_pages,
        },
      });
    } catch (error) {
      console.error("Failed to fetch anime:", error);
      dispatch({ type: Types.SETLOADING, payload: false });
    }
  };

  const searchAnime = (query) => {
    dispatch({ type: Types.SETSEARCHQUERY, payload: query });
  };

  const setFilter = (filter) => {
    dispatch({ type: Types.SETFILTER, payload: filter });
  };

  const addToFavorites = (anime) => {
    const isAlreadyFavorite = state.favorites.some(
      (fav) => fav.id === anime.id
    );
    if (!isAlreadyFavorite) {
      dispatch({ type: Types.ADDFAVORITE, payload: anime });
    }
  };

  const removeFromFavorites = (anime) => {
    dispatch({ type: Types.REMOVEFAVORITE, payload: anime });
  };

  const toggleFavorite = (anime) => {
    const isAlreadyFavorite = state.favorites.some(
      (fav) => fav.id === anime.id
    );
    if (isAlreadyFavorite) {
      removeFromFavorites(anime);
    } else {
      addToFavorites(anime);
    }
  };

  const isFavorite = (animeId) => {
    return state.favorites.some((fav) => fav.id === animeId);
  };

  const resetAndFetch = () => {
    dispatch({ type: Types.RESETLIST });
    setTimeout(() => fetchAnime(true), 100);
  };

  useEffect(() => {
    fetchAnime(true);
  }, []);

  useEffect(() => {
    if (state.searchQuery !== "" || state.currentFilter !== "popularity.desc") {
      resetAndFetch();
    }
  }, [state.searchQuery, state.currentFilter]);

  return (
    <animesContext.Provider
      value={{
        state,
        dispatch,
        fetchAnime,
        searchAnime,
        setFilter,
        addToFavorites,
        removeFromFavorites,
        toggleFavorite,
        isFavorite,
        resetAndFetch,
      }}
    >
      {children}
    </animesContext.Provider>
  );
};
