import React, { useState } from "react";
import styled from "styled-components";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { FaPowerOff, FaSearch } from "react-icons/fa";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { firebaseAuth } from "../utils/firebaseConfig";

const Navbar = ({ isScrolled }) => {
  const links = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "TV Shows",
      link: "/tv",
    },
    {
      name: "Movies",
      link: "/movies",
    },
  ];

  const Navigate = useNavigate();

  const [showSearch, setShowSearch] = useState(false);
  const [inputHover, setInputHover] = useState(false);

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (!currentUser) Navigate("/signup");
  });

  return (
    <Container>
      <nav className={`flex ${isScrolled ? "scrolled" : ""}`}>
        <div className="left flex a-center">
          <div className="brand flex a-center j-center">
            <img src={logo} alt="logo" />
          </div>
          <ul className="links flex">
            {links.map(
              (
                item,
                index // Changed the variable names here
              ) => (
                <li key={index}>
                  <Link to={item.link}>{item.name}</Link>
                </li>
              )
            )}
          </ul>
        </div>
        <div className="right flex a-center">
          <div className={`search ${showSearch ? "show-search" : ""}`}>
            <button
              onFocus={() => setShowSearch(true)}
              onBlur={() => {
                if (!inputHover) setShowSearch(false);
              }}
            >
              <FaSearch />
            </button>
            <input
              type="text"
              placeholder="Search"
              onMouseEnter={() => setInputHover(true)}
              onMouseLeave={() => setInputHover(false)}
              onBlur={() => {
                setInputHover(false);
                setShowSearch(false);
              }}
            />
          </div>
          <button onClick={() => signOut(firebaseAuth)}>
            <FaPowerOff />
          </button>
        </div>
      </nav>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  .scrolled {
    background: linear-gradient(to right, #191a19, #d8e9a8, #4e9f3d);
    box-shadow: 0px 0px 8px 4px #8e947f;
  }
  nav {
    position: sticky;
    top: 0;
    height: 86px;
    width: 100%;
    justify-content: space-between;
    position: fixed;
    z-index: 2;
    padding: 0 4rem;
    align-items: center;
    transition: 0.3s ease-in-out;

    .left {
      gap: 2rem;
      .brand {
        img {
          height: 4rem;
        }
      }
      .links {
        list-style-type: none;
        gap: 2rem;

        li {
          a {
            color: white;
            text-decoration: none;
            font-size: 1.2rem;
          }
        }
      }
    }
    .right {
      gap: 1rem;
      button {
        background-color: transparent;
        border: none;
        cursor: pointer;
        &:focus {
          outline: none;
        }
        svg {
          color: #1e5128;
          font-size: 1.2rem;
        }
      }
      .search {
        display: flex;
        gap: 0.4rem;
        align-items: center;
        justify-content: center;
        padding: 0.2rem;
        padding-left: 0.5rem;
        button {
          background-color: transparent;
          svg {
            color: #1e5128;
          }
        }
        input {
          width: 0;
          opacity: 0;
          visibility: hidden;
          transition: 0.3s ease-in-out;
          background-color: transparent;
          border: none;
          color: #d8e9a8;
          &:focus {
            outline: none;
          }
        }
      }
      .show-search {
        border: 1px solid #191a19;
        background-color: #d8e9a8;
        input {
          width: 100%;
          opacity: 1;
          visibility: visible;
          padding: 0.3rem;
        }
      }
    }
  }
`;

export default Navbar;
