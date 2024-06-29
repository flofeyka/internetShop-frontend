import { Button, Input, Radio, RadioGroup } from "@nextui-org/react";
import ProductItem from "../Cart/ProductItem";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCartList } from "../../redux/cartSlice";
import { useForm } from "react-hook-form";
import { createOrder } from "../../redux/orderSlice";

export default function OrderPage() {
  const [cartList, finalPrice, totalCount] = useSelector((state) => [
    state.Cart.cartList,
    state.Cart.finalPrice,
    state.Cart.totalCount,
  ]);

  const { register, handleSubmit } = useForm();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCartList());
  }, [dispatch]);

  const onSubmit = (data) => {
    dispatch(
      createOrder({
        address: data,
        products: cartList,
        payment: "card",
      })
    );
    window.open("/myOrders", "_self");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={"w-[50vw]"}>
      <div className={"font-bold text-3xl mb-2"}>
        <div>Оформление заказа</div>
      </div>

      <div
        className={
          "w-full min-h-[25vh] bg-white rounded-xl shadow-2xl mb-5 p-3"
        }
      >
        <div
          className={"text-3xl border-b-1 border-solid border-black font-bold"}
        >
          {" "}
          Способ оплаты
        </div>
        <RadioGroup defaultValue={"card"} className={"mt-2"}>
          <Radio value={"card"}>Картой</Radio>
          <Radio value={"money"}>Наличными</Radio>
        </RadioGroup>
        <div className={"text-3xl border-b-1 border-solid border-black"}>
          Адрес доставки
        </div>
        <div className={"mt-3"}>
          <div className={"flex mb-3"}>
            <Input
              {...register("city", { required: true })}
              variant={"faded"}
              className={"mr-3"}
              placeholder={"Город"}
              required
            />
            <Input
              {...register("street", { required: true })}
              variant={"faded"}
              placeholder={"Улица"}
              required
            />
          </div>
          <div className={"flex mb-3"}>
            <Input
              {...register("house", { required: true })}
              variant={"faded"}
              className={"mr-3"}
              placeholder={"Дом"}
              required
            />
            <Input
              {...register("entrance")}
              variant={"faded"}
              className={"mr-3"}
              placeholder={"Подъезд"}
            />
            <Input
              {...register("floor")}
              variant={"faded"}
              className={"mr-3"}
              placeholder={"Этаж"}
            />
            <Input
              {...register("flat")}
              variant={"faded"}
              placeholder={"Квартира"}
            />
          </div>
        </div>
      </div>
      <div className={"w-full min-h-[25vh] rounded-xl mb-5"}>
        <div>
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
      </div>
      <div
        className={
          "w-full min-h-[25vh] bg-white p-3 rounded-2xl mb-5 shadow-2xl"
        }
      >
        <div className={"font-bold border-b-1 border-black text-4xl"}>
          <div className={"mb-3"}>Итого</div>
        </div>
        <div className={"mt-2 flex justify-between text-2xl w-full"}>
          Сумма товаров: <div>{totalCount}</div>
        </div>
        <div className={"flex justify-between text-3xl"}>
          <div>К оплате:</div>
          <div>{finalPrice}₽</div>
        </div>
        <div>
          <Button
            size={"lg"}
            type="submit"
            className={"w-full mt-2"}
            color={"primary"}
          >
            Заказать
          </Button>
        </div>
      </div>
    </form>
  );
}
