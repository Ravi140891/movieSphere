import React from "react";
import styled from "styled-components";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";

const Header = (props) => {
  const navigate = useNavigate();
  return (
    <Container>
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      <button onClick={() => navigate(props.login ? "/login" : "/signup")}>
        {props.login ? "Log In" : "Signup"}
      </button>
    </Container>
  );
};

const Container = styled.div`
  padding: 1rem 4rem;
  height: 86px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(to right, #191a19, #d8e9a8, #4e9f3d);
  box-shadow: 0px 0px 8px 4px #8e947f;
  .logo {
    width: 200px;
    cursor: pointer;
    img {
      width: 100%;
    }
  }
  button {
    padding: 0.5rem 1rem;
    background-color: #4e9f3d;
    border: none;
    color: white;
    font-size: 1.2rem;
    font-weight: bolder;
    border-radius: 5px;
    cursor: pointer;
    transition: 1s;
    &:hover {
      background-color: #1e5128;
    }
  }
`;

export default Header;
