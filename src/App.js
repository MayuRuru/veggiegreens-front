import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home";
import Login from "./features/auth/Login";
import DashLayout from "./components/DashLayout";
import Welcome from "./features/auth/Welcome";
import OrdersList from "./features/orders/OrdersList";
import UsersList from "./features/users/UsersList";
import EditUser from "./features/users/EditUser";
import NewUserForm from "./features/users/NewUserForm";
import EditNote from "./features/orders/EditNote";
import NewNote from "./features/orders/NewNote";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />

        <Route path="dash" element={<DashLayout />}>
          {/* From here protected routes: */}
          <Route index element={<Welcome />} />

          {/* Users routes: */}
          <Route path="users">
            <Route index element={<UsersList />} />
            <Route path=":id" element={<EditUser />} />
            <Route path="new" element={<NewUserForm />} />
          </Route>

          {/* Orders routes: */}
          <Route path="orders">
            <Route index element={<OrdersList />} />
            <Route path=":id" element={<EditNote />} />
            <Route path="new" element={<NewNote />} />
          </Route>
        </Route>
        {/*End Dash - Private routes*/}
      </Route>
    </Routes>
  );
}

export default App;
