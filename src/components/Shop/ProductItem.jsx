import { Button } from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addOneToCart, deleteOneFromCart, getCartList } from "../../redux/cartSlice";
import { useEffect } from "react";

export default function ProductItem({ id, image, price, name }) {
    const dispatch = useDispatch();
    const cartList = useSelector(state => state.Cart.cartList);
    useEffect(() => {
        dispatch(getCartList());
    }, [dispatch])

    return (
        <div className="hover:bg-white hover:shadow-2xl transition-all w-[250px] sm:w-[180px] min-h-[350px] rounded-2xl mb-5 flex p-3">
            <div className={"flex flex-col mx-auto w-full"}>
                <Link to={`/product/${id}`} className="w-full">
                    <div>
                        <img
                            alt={"product"}
                            src={"https://internetshop-1.onrender.com/" + image}
                            className={
                                "h-[270px] sm:h-[250px] w-[150px] w-full rounded-xl border-1 border-solid border-black"
                            }
                        />
                    </div>
                    <div className={"font-sans text-xl mt-1"}>{price}₽</div>
                    <div className="text-ellipsis overflow-hidden h-full whitespace-nowrap">
                        <Link to="">{"{product.owner.name}"}</Link> / {" "}
                        <Link
                            to={`/product/${id}`}
                        >
                            {name}
                        </Link>
                    </div>
                </Link>
                {cartList.find((item) => item.id === id) ? (
                    <div className={"flex w-full items-end h-full mt-2"}>
                        <Button
                            onClick={() => dispatch(deleteOneFromCart(id))}
                            className={"w-full"}
                            variant={"faded"}>
                            В корзине
                        </Button>
                    </div>
                ) : (
                    <div className={"flex w-full items-end h-full mt-2"}>
                        <Button
                            onClick={() => dispatch(addOneToCart(id))}
                            color={"primary"}
                            className={"w-full"}
                        >
                            Добавить в корзину
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}