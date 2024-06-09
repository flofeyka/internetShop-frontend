import './App.css';
import {Navigate, Route, Routes} from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Lk from "./components/Lk";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getUsersData} from "./redux/authSlice";
import HistoryViews from "./components/HistoryViews";
import Profile from "./components/Profile";
import Favourites from "./components/Favourites";
import Header from "./components/Header";
import Cart from "./components/Cart";


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

    return <div className={"min-h-screen h-[100%] bg-[aliceblue]"}>
        <Header/>
        <div className={"w-full flex flex-col items-center mt-5"}>
            <Routes>
                <Route path="*" element={<Navigate to={"/lk"}/>}/>
                <Route path="/shop" element={<div>Shop</div>}/>
                <Route path="/lk" element={<Lk/>}/>
                <Route path="/cart" element={<Cart/>}/>
                <Route path="/historyViews" element={<HistoryViews/>}/>
                <Route path="/profile" element={<Profile/>}/>
                <Route path="/favourites" element={<Favourites/>}/>
            </Routes>
        </div>
    </div>

}

export default App;
