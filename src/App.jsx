import "./App.css";
import { NavLink, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Lk from "./pages/Lk/Lk";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import HistoryViews from "./pages/Lk/HistoryViews";
import Profile from "./pages/Lk/Profile";
import Favourites from "./pages/Lk/FavouritesPage";
import Header from "./components/Header";
import Cart from "./pages/Cart";
import Shop from "./pages/ShopPage";
import OrderPage from "./pages/Order";
import ProductPage from "./pages/ProductPage";
import MyProducts from "./pages/Products";
import CreateProduct from "./pages/Admin/CreateProduct";
import NotTakenOrders from "./pages/Admin/NotTakenOrders";
import MyOrders from "./pages/Lk/MyOrders";
import NotVerifiedOrders from "./pages/Admin/NotVerifiedOrders";
import TakenOrders from "./pages/Lk/TakenOrders";
import AdminList from "./pages/Admin/AdminPage";
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
          <img src="/Mobile/House.svg" alt="home" className="h-[5vh]" />
        </NavLink>
        <NavLink to="/cart">
          <img src="/Mobile/Cart.svg" alt="cart" className="h-[5vh]" />
        </NavLink>
        <NavLink to="/favourites">
          <img src="/Mobile/Heart.svg" alt="favourites" className="h-[5vh]" />
        </NavLink>
        <NavLink to="/lk">
          <img src="/Mobile/Profile.svg" alt="profile" className="h-[5vh]" />
        </NavLink>
      </div>
    </div>
  );
}

export default App;
