import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCartList } from "../redux/cartSlice";
import { Button } from "@nextui-org/react";
import ProductItem from "../components/Private/ProductItem";
import { Link } from "react-router-dom";
import { setProducts } from "../redux/orderSlice";

export default function Cart() {
  const [cartList, totalCount, finalPrice] = useSelector((state) => [
    state.Cart.cartList,
    state.Cart.totalCount,
    state.Cart.finalPrice,
  ]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCartList());
  }, [dispatch]);

  return (
    <div className={"flex sm:flex-col"}>
      <div
        className={"w-[50vw] sm:w-[90vw] min-h-[30vh]"}
      >
        <div className="p-3 bg-white rounded-2xl shadow-2xl w-[50vw] sm:w-full text-2xl font-semibold mb-5">
          Корзина
        </div>
        {cartList.length === 0 && (
          <div className="p-3 bg-white rounded-2xl shadow-2xl w-[50vw] sm:w-full text-2xl text-center font-semibold">
            Пока что здесь пусто
          </div>
        )}
        {cartList.map((item) => (
          <ProductItem
            key={item.id}
            count={item.count}
            id={item.id}
            name={item.name}
            image={item.image}
            quantity={item.quantity}
            finalProductPrice={item.finalProductPrice}
          />
        ))}
      </div>
      <div
        className={"bg-white w-[15vw] sm:w-full rounded-2xl lg:ml-5 shadow-2xl p-3 h-[30vh]"}
      >
        <div className={"font-bold text-3xl"}>Итого</div>
        <div>
          Стоимость: <b>{finalPrice}</b>
        </div>
        <div>
          Общее количество товаров: <b>{totalCount}</b>
        </div>
        <Link to={"/orderPage"} className={"flex mt-2"}>
          <Button
            onClick={() => {
              dispatch(setProducts(cartList));
            }}
            className={"w-full"}
            size={"lg"}
            disabled={cartList.length < 1}
            color={cartList.length < 1 ? "default" : "primary"}
          >
            Оформить заказ
          </Button>
        </Link>
      </div>
    </div>
  );
}
