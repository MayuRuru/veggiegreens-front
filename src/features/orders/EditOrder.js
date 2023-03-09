import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectOrderById } from "./ordersApiSlice";
import { selectAllUsers } from "../users/usersApiSlice";
import EditOrderForm from "./EditOrderForm";

const EditOrder = () => {
  const { id } = useParams();

  const order = useSelector((state) => selectOrderById(state, id));
  const users = useSelector(selectAllUsers);

  const content =
    order && users ? (
      <EditOrderForm order={order} users={users} />
    ) : (
      <p>Loading...</p>
    );

  return content;
};
export default EditOrder;
