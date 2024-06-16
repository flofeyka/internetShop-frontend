import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Lk from "./components/Profile/Lk";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUsersData } from "./redux/authSlice";
import HistoryViews from "./components/Profile/HistoryViews";
import Profile from "./components/Profile/Profile";
import Favourites from "./components/Favourites";
import Header from "./components/Header";
import Cart from "./components/Cart/Cart";
import Shop from "./components/Shop";
import OrderPage from "./components/Cart/Order";
import ProductPage from "./components/Products/ProductPage";
import MyProducts from "./components/Products/Products";
import CreateProduct from "./components/Products/CreateProduct";
import AdminList from "./components/Profile/AdminPage/AdminList";
import NotTakenOrders from "./components/Profile/OrderPanel/NotTakenOrders";
import MyOrders from "./components/Profile/MyOrders";
import NotVerifiedOrders from "./components/Profile/OrderPanel/NotVerifiedOrders";
import TakenOrders from "./components/Profile/OrderPanel/TakenOrders";

function App() {
  const [isAuth, isOwner] = useSelector((state) => [
    state.Auth.isAuth,
    state.Auth.user.isOwner,
  ]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsersData());
  }, [dispatch, isAuth]);

  if (!isAuth) {
    return (
      <Routes>
        {/*<Route path="*" element={<Navigate to="/login" />} />*/}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    );
  }

  return (
    <div className={"min-h-screen h-[100%] bg-[aliceblue]"}>
      <Header />
      <div className={"w-full max-w-[100vw] flex flex-col items-center mt-5"}>
        <Routes>
          <Route path="*" element={<Navigate to={"/lk"} />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/lk" element={<Lk />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/historyViews" element={<HistoryViews />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/favourites" element={<Favourites />} />
          <Route path="/orderPage" element={<OrderPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/myOrders" element={<MyOrders />} />
          <Route path="/takenOrders" element={<TakenOrders />} />
          {isOwner && (
            <>
              <Route path="/createProduct" element={<CreateProduct />} />
              <Route path="/myProducts" element={<MyProducts />} />
              <Route path="/admins" element={<AdminList />} />
              <Route path="/productOrders" element={<></>} />
              <Route path="/notTakenOrders" element={<NotTakenOrders />} />
              <Route
                path="/notVerifiedOrders"
                element={<NotVerifiedOrders />}
              />
            </>
          )}
        </Routes>
      </div>
    </div>
  );
}

export default App;
