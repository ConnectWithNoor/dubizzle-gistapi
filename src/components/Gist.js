import styled from "styled-components";
import RepoStats from "./RepoStats";
import { trimFileName, trimSentence } from "../utils/helpers";

const Gist = ({ gist }) => {
  const filesList = Object.keys(gist.files);

  return (
    <Wrapper>
      {/* First row */}
      <Row justifyContent={"space-between"}>
        {/* avatar and username */}
        <Row>
          <Avatar src={gist.owner.avatar_url} />
          <h5>{gist.owner.login}</h5>
        </Row>
        {/* repo stats */}
        <Row>
          <RepoStats
            statTitle={`${filesList.length} Files`}
            statUrl={gist.html_url}
            icon={"code"}
          />
          <RepoStats
            statTitle={`Fork`}
            statUrl={gist.forks_url}
            icon={"repo-forked"}
          />
          <RepoStats
            statTitle={`${gist.comments} Comments`}
            statUrl={gist.comments_url}
            icon={"comment"}
          />
          <RepoStats
            statTitle={`Stars`}
            statUrl={gist.html_url}
            icon={"star"}
          />
        </Row>
      </Row>

      {/* second row */}
      <Row>
        <p>Created at : {new Date(gist.created_at).toDateString()}</p>
        <p>Updated at : {new Date(gist.updated_at).toDateString()}</p>
      </Row>

      {/* third row */}

      <UserDescription>
        {gist.description ? trimSentence(gist.description) : "No description"}
      </UserDescription>

      {/* forth row */}

      <Row>
        {filesList.map((file, index) => (
          <RepoStats
            key={`${file}${index}`}
            statTitle={trimFileName(file)}
            icon={"file"}
            isLink={false}
          />
        ))}
      </Row>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 40%;
  padding: 5px;

  border-bottom: 1px solid #eee;

  padding-bottom: 1.5rem;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 5px;
  color: #2f2ace;

  justify-content: ${(props) => props.justifyContent || "flex-start"};
`;

const Avatar = styled.img`
  border-radius: 50%;
  margin-right: 5px;

  width: 40px;
  height: 40px;
`;

const UserDescription = styled.p`
  font-size: 16px;
  margin: 10px 0;
`;

export default Gist;
