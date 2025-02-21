import React from "react";
import Navbar from "./components/navbar/navbar";

const Error = () => {
  return (
    <>
      <Navbar />
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h1>404</h1>
        <p>Ohh! Look like page you're looking for doesn't exist</p>
      </div>
    </>
  );
};

export default Error;
