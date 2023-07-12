import React from "react";
import styled from "styled-components";
import Octicon from "react-octicon";

const RepoStats = ({ statTitle, statUrl, icon, isLink = true }) => {
  return (
    <Row>
      <Octicon name={icon} />

      {/* render anchor tag for links and paragraphs for texts */}
      {isLink ? (
        <StatAnchorTitle href={statUrl} target="_blank">
          {statTitle}
        </StatAnchorTitle>
      ) : (
        <StatParaTitle>{statTitle}</StatParaTitle>
      )}
    </Row>
  );
};

const StatAnchorTitle = styled.a`
  font-size: 16px;

  cursor: pointer;
`;

const StatParaTitle = styled.div`
  font-size: 16px;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;

  margin-right: 10px;
  justify-content: ${(props) => props.justifyContent || "flex-start"};
`;

export default RepoStats;
