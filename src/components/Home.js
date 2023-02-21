import { Link } from "react-router-dom";

import React from "react";

const Home = () => {
  const content = (
    <section className="home">
      <header>
        <h1>Welcome</h1>
      </header>

      <main className="home__main">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip.{" "}
        </p>
        <address className="home_address">
          Little town
          <br />
          555 Small Road
          <br />
          80990 Around here
          <br />
        </address>
      </main>
      <footer>
        <Link to="/login">Customers Login</Link>
      </footer>
    </section>
  );

  return content;
};

export default Home;
