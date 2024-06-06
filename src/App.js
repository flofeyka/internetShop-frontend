import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Link, Navigate, Route, Routes} from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Lk from "./components/Lk";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getUsersData, LogoutSystem} from "./redux/authSlice";
import {Button, Input} from "@nextui-org/react";
import HistoryViews from "./components/HistoryViews";
import {FirstLetterAvatar} from "first-letter-avatar";
import Profile from "./components/Profile";


function App() {

    const isAuth = useSelector(state => state.Auth.isAuth);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getUsersData());
    }, [dispatch, isAuth]);

    if (!isAuth) {
        return <Routes>
            {/*<Route path="*" element={<Navigate to="/login" />} />*/}
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
        </Routes>
    }

    return <div className={"h-screen bg-[aliceblue]"}>
        <header
            className={"flex bg-[white] border-b-1 border-solid border-black justify-between px-4 py-1 items-center"}>
            <div className={"text-3xl font-semibold "}>Интернет магазин</div>
            <div className={"mr-2 flex w-[350px]"}><Input size={"lg"} placeholder={"Введите товар"} variant={"faded"}/>
            </div>
            <div className={"flex"}>
                <Link to={`/favorite`} className={"mr-3 flex flex-col items-center"}>
                    <div><img height={"25px"} width={"25px"} src={"/Icons/Heart.svg"}/></div>
                    <div className={"mt-1"}>Избранное</div>
                </Link>
                <Link to={`/lk`} className={"mr-3 flex flex-col items-center"}>
                    <div><img height={"25px"} width={"25px"} src={"/Icons/Profile.svg"}/></div>
                    <div className={"mt-1"}>Профиль</div>
                </Link>
                <Link to={`/cart`} className={"mr-3 flex flex-col items-center"}>
                    <div><img height={"25px"} width={"25px"} src={"/Icons/Cart.svg"}/></div>
                    <div className={"mt-1"}>Корзина</div>
                </Link>
            </div>
        </header>
        <div className={"w-full flex flex-col items-center mt-5"}>
            <Routes>
                <Route path="/shop" element={<div>Shop</div>}/>
                <Route path="/lk" element={<Lk/>}/>
                <Route path="/cart" element={<div>Cart</div>}/>
                <Route path="/historyViews" element={<HistoryViews/>}/>
                <Route path="/profile" element={<Profile/>}/>
            </Routes>
        </div>

    </div>

}

export default App;
