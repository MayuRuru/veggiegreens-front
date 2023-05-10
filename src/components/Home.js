import { Link } from "react-router-dom";
import React from "react";
import veggieRecipes from "../mocks/veggie-recipes.json";
//import noData from "../mocks/no-results.json";

const Home = () => {
  const recipes = veggieRecipes.results;
  //console.log(recipes);
  const hasRecipes = recipes.length > 0;

  const renderRecipes = () => {
    return (
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.id}>
            <h3>{recipe.title}</h3>
            <img src={recipe.image} alt={recipe.title} />
          </li>
        ))}
      </ul>
    );
  };

  const renderNoResults = () => {
    return <p>No recipes found</p>;
  };

  const content = (
    <section className="home">
      <header>
        <h1>Welcome</h1>
        <form>
          <input placeholder="Spaguetti aglio et olio..." />
          <button type="submit">Find a recipe</button>
        </form>
      </header>

      <main className="home__main">
        <section>{hasRecipes ? renderRecipes : renderNoResults}</section>
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
