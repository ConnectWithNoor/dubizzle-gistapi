/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Octicon from "react-octicon";
import { getGistForUser } from "../services/gistService";
import { gistContext } from "../store/gistContext";
import { ADD_PUBLIC_GISTS } from "../store/actions";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const { dispatch, setError, isUserGistAlreadyExist } =
    useContext(gistContext);

  const fetchUserGist = useCallback(async () => {
    try {
      setError(null);
      const userGist = await getGistForUser(searchTerm);
      if (userGist?.data) {
        const payload = {
          user: searchTerm.toLowerCase(),
          data: userGist.data,
        };

        dispatch({
          type: ADD_PUBLIC_GISTS,
          payload,
        });
      } else {
        throw new Error("Something went wrong.");
      }
    } catch (err) {
      setError(err);
    }
  }, [searchTerm, dispatch, setError]);

  useEffect(() => {
    let delayApiCall;
    if (searchTerm.trim()) {
      delayApiCall = setTimeout(() => {
        // Send Axios request here

        if (!isUserGistAlreadyExist(searchTerm)) {
          fetchUserGist();
        }
      }, 500);
    }

    return () => clearTimeout(delayApiCall);
  }, [searchTerm, fetchUserGist]);

  return (
    <Wrapper>
      <InputBox>
        <Octicon name="search" />
        <Input
          placeholder="Search Gists for the username"
          onChange={(e) => setSearchTerm(e.target.value.trim())}
        />
      </InputBox>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 8px;
  background-color: #ffffff;
  font-size: 14px;
  line-height: 1.5;
  border-radius: 6px;
  margin: 0 16px;
`;

const InputBox = styled.div`
  border-radius: 4px;
  display: flex;
  width: 400px;
`;

const Input = styled.input`
  border: none;
  width: 100%;
  font-size: 16px;

  &:focus {
    outline: 0;
  }
`;

export default Search;
