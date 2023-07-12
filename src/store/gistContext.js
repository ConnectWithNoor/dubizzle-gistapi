import React, { useReducer, useState } from "react";
import { ADD_PUBLIC_GISTS } from "./actions";

const gistContext = React.createContext();

function GistProvider({ children }) {
  const [gistList, setGistList] = useState([]);
  const [publicGists, dispatch] = useReducer(reducer, []);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  function reducer(state, action) {
    switch (action.type) {
      case ADD_PUBLIC_GISTS:
        setGistList([...action.payload.data]);
        return [...state, action.payload];

      default:
        return publicGists;
    }
  }

  function isUserGistAlreadyExist(username) {
    const found = publicGists.find(
      (gist) => gist.user === username.toLowerCase()
    );

    if (found) {
      setGistList([...found.data]);
      return true;
    }

    return false;
  }

  return (
    <gistContext.Provider
      value={{
        dispatch,
        isUserGistAlreadyExist,
        error,
        setError,
        gistList,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </gistContext.Provider>
  );
}

export { GistProvider, gistContext };
