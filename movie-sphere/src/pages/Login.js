import React, { useState } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import styled from "styled-components";
import Header from "../components/Header";
import Background from "../components/Background";
import { firebaseAuth } from "./../utils/firebaseConfig";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const Navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState(""); // New state variable

  const handleSignIn = async () => {
    try {
      const { email, password } = formValues;
      await signInWithEmailAndPassword(firebaseAuth, email, password);
    } catch (error) {
      console.log(error);
      setErrorMessage("User details don't match in our records"); // Set error message
    }
  };

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) Navigate("/");
  });

  return (
    <Container>
      <Background />
      <div className="content">
        <Header />
        <div className="form-container flex column a-center j-center">
          <div className="form flex column a-center j-center">
            <div className="title">
              <h3>Login</h3>
            </div>
            <div className="container flex column">
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
              <button onClick={handleSignIn}>Log In</button>
              {errorMessage && <p className="error">{errorMessage}</p>}{" "}
              {/* Display error message */}
            </div>
          </div>
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
    grid-template-rows: 15vh 85vh;

    .form-container {
      gap: 2rem;
      height: 85vh;

      .form {
        padding: 2rem;
        background-color: #000000b0;
        width: 25vw;
        gap: 2rem;
        color: white;

        .container {
          gap: 2rem;
          input {
            padding: 0.5rem 1rem;
            width: 15rem;
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

        .error {
          color: red; // Add styles for error message
        }
      }
    }
  }
`;

export default Login;
