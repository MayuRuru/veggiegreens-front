import { Link } from "react-router-dom";

const Welcome = () => {
  const date = new Date();
  const today = new Intl.DateTimeFormat("es-ES", {
    dateStyle: "full",
    timeStyle: "long",
  }).format(date);

  const content = (
    <section className="welcome">
      <p>{today}</p>

      <h1>Welcome!</h1>

      <p>
        <Link to="/dash/orders">Your orders</Link>
      </p>
      <p>
        <Link to="/dash/orders/new">Add new order</Link>
      </p>

      <p>
        <Link to="/dash/users">User Settings</Link>
      </p>

      <p>
        <Link to="/dash/users/new">Add new user</Link>
      </p>
    </section>
  );

  return content;
};
export default Welcome;
