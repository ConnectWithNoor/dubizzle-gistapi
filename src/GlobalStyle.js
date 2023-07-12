import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  body{
    margin: 0;
    font-family: Helvetica Neue,Helvetica,Segoe UI,Arial,freesans,sans-serif;
    color: #626465;
  }
  *{
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  a{
    text-transform: none;
    text-decoration:none;
  }

  p {
    color: #555;
    font-size: 12px;
    
    margin-top: 5px;
  }

  h1,h2,h3,h4,h5,h6,a {
    color: #2f2ace;
  }
`;

export default GlobalStyles;
