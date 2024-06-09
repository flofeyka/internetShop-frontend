import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {getCartList} from "../redux/cartSlice";
import {Button} from "@nextui-org/react";

export default function Cart() {
    const [cartList, totalCount, finalPrice] = useSelector(state => [
        state.Cart.cartList,
        state.Cart.totalCount,
        state.Cart.finalPrice]);
    const dispatch = useDispatch();
    const [counter, setCounter] = useState(1);


    useEffect(() => {
        dispatch(getCartList());
    }, [dispatch]);

    return <div className={"flex"}>
        <div className={"bg-white w-[50vw] min-h-[30vh] p-3 rounded-2xl shadow-2xl"}>
            <div className={"text-3xl font-semibold mb-5 pb-3 border-b-2 border-solid border-black"}>Корзина</div>
            {cartList.map((item) => <div
                className={"border-1 border-solid border-black rounded-xl max-h-[20vh] p-3 flex"}>
                <div><img alt={"product"} src={item.image} className={"h-[100px] w-[105px] rounded-xl"}/></div>
                <div className={"ml-3 "}>
                    <div className={"font-semibold text-3xl"}>
                        {item.name}
                    </div>
                    <div className={"mt-2 text-2xl flex"}>
                        <div>{counter * item.price}₽</div>
                        <div className={"ml-5"}>
                            <Button size={"sm"} onClick={() => setCounter(counter + 1)}>+</Button>
                            <input className={"w-[502px]"} value={counter} onChange={(event) => setCounter(event.target.value)}/>
                            <Button onClick={() => counter > 1 ? setCounter(counter - 1) : setCounter(counter)}
                                    size={"sm"}>-</Button></div>
                    </div>
                </div>
            </div>)}
        </div>
        <div className={"bg-white w-[15vw] rounded-2xl ml-5 shadow-2xl p-3 h-[30vh]"}>
            <div className={"font-bold text-3xl"}>Итого</div>
            <div>Стоимость: <b>{finalPrice}</b></div>
            <div>Общее количество товаров: <b>{totalCount}</b></div>
            <div className={"flex mt-2"}>
                <Button className={"w-full"} size={"lg"} color={"primary"}>Оформить заказ</Button>

            </div>
        </div>
    </div>
}