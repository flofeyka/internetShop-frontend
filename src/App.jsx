import "./App.css";
import { NavLink, Navigate, Route, Routes } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Lk from "./components/Profile/Lk";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import HistoryViews from "./components/Profile/HistoryViews";
import Profile from "./components/Profile/Profile";
import Favourites from "./components/Favourites";
import Header from "./components/Header";
import Cart from "./components/Cart/Cart";
import Shop from "./components/Shop";
import OrderPage from "./components/Order/Order";
import ProductPage from "./components/ProductPage";
import MyProducts from "./components/Products/Products";
import CreateProduct from "./components/Products/CreateProduct";
import NotTakenOrders from "./components/Profile/OrderPanel/NotTakenOrders";
import MyOrders from "./components/Profile/MyOrders";
import NotVerifiedOrders from "./components/Profile/OrderPanel/NotVerifiedOrders";
import TakenOrders from "./components/Profile/OrderPanel/TakenOrders";
import AdminList from "./components/AdminPage/AdminList";
import { initializedApp } from "./redux/appSlice";

function App() {
  const [isAuth, isOwner, initialized] = useSelector((state) => [
    state.Auth.isAuth,
    state.Auth.user.isOwner,
    state.App.initialized
  ]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializedApp());
  }, [dispatch, isAuth]);

  if (!initialized) {
    return <div className="h-full w-full flex justify-center items-center">
      <img alt="loader" src="https://media4.giphy.com/media/3oEjI6SIIHBdRxXI40/200w.gif?cid=6c09b952ymsvf7f51hqrrol1e0curv88w30g0kqjlnh58bo7&ep=v1_gifs_search&rid=200w.gif&ct=g" />
    </div>;
  }

  if (!isAuth) {
    return (
      <Routes>
        <Route path="*" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    );
  }

  return (
    <div className={"min-h-screen h-[100%] bg-gray-100"}>
      <Header />
      <div className={"w-full max-w-[100vw] flex flex-col items-center mt-5 sm:mb-[9vh]"}>
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
      <div className="lg:hidden bg-white fixed w-[100vw] -bottom-1 h-[10vh] flex items-center px-7 justify-between">
        <NavLink to="/shop">
          <img src="/Mobile/House.svg" className="h-[5vh]" />
        </NavLink>
        <NavLink to="/cart">
          <img src="/Mobile/Cart.svg" className="h-[5vh]" />
        </NavLink>
        <NavLink to="/favourites">
          <img src="/Mobile/Heart.svg" className="h-[5vh]" />
        </NavLink>
        <NavLink to="/lk">
          <img src="/Mobile/Profile.svg" className="h-[5vh]" />
        </NavLink>
      </div>
    </div>
  );
}

export default App;
