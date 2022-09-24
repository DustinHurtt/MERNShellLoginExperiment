import React from "react";
import { Link } from "react-router-dom";
import { get } from "../authService/authService";

const Home = ({logout}) => {
  React.useEffect(() => {
    let token = localStorage.getItem("authToken");
    console.log("This is the token", token);
    get("/users/login-test")
      .then((results) => {
        console.log("Are we logged in?", results.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <div>
         <header className="nav-wrapper">
          <div className="navIconContainer">
            <Link to="/" className="navIconImage">
              <img className="navIcon" src={""} alt="appIcon" />
            </Link>

            <h1 className="navHeadline">Mern Shell</h1>
          </div>

            <nav className="nav-items">
              <Link to="/" className="icon">+Home</Link>
              <button onClick={()=>logout()} className="icon">Logout</button>
            </nav>
         
        </header>     
      <div className="homeLanding">
        <div className="homeContainer">
          <h1 className="homeText">Welcome to the MERN Shell!</h1>
          <h2 className="homeText">Customize for your own purposes</h2>
        </div>
      </div>
    </div>
  );
};

export default Home;
