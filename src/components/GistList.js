import React, {
  useCallback,
  useEffect,
  useState,
  memo,
  useContext,
} from "react";
import styled from "styled-components";

import Gist from "./Gist";

import { getPublicGists } from "../services/gistService";
import { gistContext } from "../store/gistContext";
import { ADD_PUBLIC_GISTS } from "../store/actions";

const GistList = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { gistList, dispatch, error, setError } = useContext(gistContext);

  const fetchPublicGists = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const publicGists = await getPublicGists();

      if (publicGists?.data) {
        const payload = {
          user: "public",
          data: publicGists?.data,
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
    } finally {
      setIsLoading(false);
    }
  }, [dispatch, setError]);

  useEffect(() => {
    fetchPublicGists();
  }, [fetchPublicGists]);

  return (
    <Wrapper>
      {isLoading ? (
        <div> Loading... </div>
      ) : error ? (
        <div>{error?.message}</div>
      ) : gistList?.length > 0 ? (
        gistList.map((gistItem) => <Gist key={gistItem.id} gist={gistItem} />)
      ) : (
        <div>No user found</div>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  margin-top: 2rem;
  gap: 1rem;
`;

export default memo(GistList);
