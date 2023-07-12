import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";

import { getPublicGists } from "../services/gistService";
import Gist from "./Gist";

const GistList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [gistList, setGistList] = useState([]);

  const fetchPublicGists = useCallback(async () => {
    try {
      setIsLoading(true);

      const publicGists = await getPublicGists();

      if (publicGists?.data) {
        setGistList([...publicGists.data]);
      } else {
        throw new Error("Something went wrong.");
      }
    } catch (err) {
      console.log("something went wrong", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPublicGists();
  }, [fetchPublicGists]);

  return (
    <Wrapper>
      {isLoading ? (
        <div> Loading... </div>
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

export default GistList;
