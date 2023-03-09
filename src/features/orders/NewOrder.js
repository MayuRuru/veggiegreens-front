import { useSelector } from "react-redux";
import { selectAllUsers } from "../users/usersApiSlice";
import NewOrderForm from "./NewOrderForm";

const NewOrder = () => {
  const users = useSelector(selectAllUsers);

  const content = users ? <NewOrderForm users={users} /> : <p>Loading...</p>;

  return content;
};

export default NewOrder;
