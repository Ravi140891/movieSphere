import React from "react";
import background from "../assets/329633.jpg";
import styled from "styled-components";

const Background = () => {
  return (
    <Container>
      <img src={background} alt="background" />
    </Container>
  );
};

const Container = styled.div`
  height: 100vh;
  width: 100%;

  img {
    height: 100vh;
    width: 100%;
  }
`;

export default Background;
