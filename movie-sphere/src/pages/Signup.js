import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import styled from "styled-components";
import Header from "../components/Header";
import Background from "../components/Background";
import { firebaseAuth } from "./../utils/firebaseConfig";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const Navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const handleSignUp = async () => {
    try {
      const { email, password } = formValues;
      await createUserWithEmailAndPassword(firebaseAuth, email, password);
    } catch (error) {
      console.log(error);
    }
  };

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) Navigate("/");
  });

  return (
    <Container showPassword={showPassword}>
      <Background />
      <div className="content">
        <Header login />
        <div className="body flex column a-center j-center">
          <div className="text flex column">
            <h1>Unlimited Movies, TV Shows and Much More</h1>
            <h4>Watch anywhere</h4>
            <h6>Enter your email to enjoy watching movies.</h6>
          </div>
          <div className="form">
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              value={formValues.email}
              onChange={(e) =>
                setFormValues({
                  ...formValues,
                  [e.target.name]: e.target.value,
                })
              }
            />
            {showPassword && (
              <input
                type="password"
                placeholder="Enter Password"
                name="password"
                value={formValues.password}
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            )}
            {!showPassword && (
              <button onClick={() => setShowPassword(true)}>
                Start Watching
              </button>
            )}
          </div>
          <button onClick={handleSignUp}>Sign Up</button>
        </div>
      </div>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  .content {
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    height: 100%;
    width: 100%;
    display: grid;
    grid-template-rows: 15vh;

    .body {
      gap: 1rem;
      .text {
        gap: 1rem;
        text-align: center;
        font-size: 2rem;

        h1 {
          padding: 0 25rem;
        }
      }
      .form {
        display: grid;
        grid-template-columns: ${({ showPassword }) =>
          showPassword ? "1fr 1fr" : "2fr 1fr"};
        width: 60%;

        input {
          color: black;
          border: none;
          padding: 1.5rem;
          font-size: 1.2rem;
          border: 1px solid black;

          &:focus {
            outline: none;
          }
        }
        button {
          padding: 0.5rem 1rem;
          background-color: #4e9f3d;
          border: none;
          color: white;
          font-size: 1.2rem;
          font-weight: bolder;
          cursor: pointer;
          transition: 1s;
          &:hover {
            background-color: #1e5128;
          }
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
    }
  }
`;

export default Signup;
