import { useSelector } from "react-redux";
import { selectAllUsers } from "../users/usersApiSlice";
import NewOrderForm from "./NewOrderForm";

const NewOrder = () => {
  const users = useSelector(selectAllUsers);

  if (!users?.length) return <p>No users available</p>;

  const content = <NewOrderForm users={users} />;

  return content;
};

export default NewOrder;
