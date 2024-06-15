import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getCartList} from "../../redux/cartSlice";
import {Button} from "@nextui-org/react";
import ProductItem from "./ProductItem";
import {Link} from "react-router-dom";

export default function Cart() {
    const [cartList, totalCount, finalPrice] = useSelector(state => [
        state.Cart.cartList,
        state.Cart.totalCount,
        state.Cart.finalPrice]);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCartList());
    }, [dispatch]);

    return <div className={"flex "}>
        <div className={"bg-white w-[50vw] min-h-[30vh] p-3 rounded-2xl shadow-2xl"}>
            <div className={"text-3xl font-semibold mb-5 pb-3 border-b-2 border-solid border-black"}>Корзина</div>
            {cartList.map(item => <ProductItem key={item.id} count={item.count} id={item.id} name={item.name} image={item.image}
                                               quantity={item.quantity} finalProductPrice={item.finalProductPrice}/>)}
        </div>
        <div className={"bg-white w-[15vw] rounded-2xl ml-5 shadow-2xl p-3 h-[30vh]"}>
            <div className={"font-bold text-3xl"}>Итого</div>
            <div>Стоимость: <b>{finalPrice}</b></div>
            <div>Общее количество товаров: <b>{totalCount}</b></div>
            <Link to={"/orderPage"} className={"flex mt-2"}>
                <Button className={"w-full"} size={"lg"} disabled={cartList.length < 1} color={cartList.length < 1 ? "default" : "primary"}>Оформить заказ</Button>
            </Link>
        </div>
    </div>
}