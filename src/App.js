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
import EditOrder from "./features/orders/EditOrder";
import NewOrder from "./features/orders/NewOrder";
import Prefetch from "./features/auth/Prefetch";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />

        {/* From here protected routes: */}
        <Route element={<Prefetch />}>
          <Route path="dash" element={<DashLayout />}>
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
              <Route path=":id" element={<EditOrder />} />
              <Route path="new" element={<NewOrder />} />
            </Route>
          </Route>
          {/*End Dash - End Prefecth - Private routes*/}
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
