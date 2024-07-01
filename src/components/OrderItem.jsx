import { Button } from "@nextui-org/react";
import { useDispatch } from "react-redux";
import { cancelOrder, verifyOrder } from "../redux/orderSlice";

export default function OrderItem({ order }) {
  const dispatch = useDispatch();

  return (
    <div className="bg-white mb-5 p-4 rounded-2xl min-w-[50vw] flex shadow-xl hover:shadow-2xl transition-all">
      {order.canceled === true && (
        <div className="w-[55vw] -p-3 min-h-[21.5vh] absolute flex justify-center items-center rounded-2xl opacity-80 text-3xl font-bold text-white z-100 bg-black">
          Заказ отменен
        </div>
      )}
      <div className="w-[175px] mr-3">
        <img
          className="h-[175px] w-[175px] rounded-2xl mb-2"
          alt="order"
          src={"https://internetshop-1.onrender.com/" + order.image}
        />
        {!order.isTaken && (
          <Button
            className="w-full"
            color="danger"
            onClick={() => dispatch(cancelOrder(order.id))}
            size="lg"
          >
            Отменить заказ
          </Button>
        )}

        {!order.isVerified && (
          <Button
            size="lg"
            onClick={() => dispatch(verifyOrder(order.id))}
            className="w-full mt-2 text-white font-semibold"
            color="success"
          >
            Подтвердить
          </Button>
        )}
      </div>
      <div>
        <div className="text-3xl font-semibold">{order.name}</div>
        <div>
          Количество: <span className="font-semibold">{order.count} шт.</span>
        </div>
        <div>
          Получатель <span className="font-semibold">{order.waiterName}</span>
        </div>
        <div>
          Номер телефона получателя:{" "}
          <span className="font-semibold">{order.phoneNumber}</span>
        </div>
        <div>
          Адрес электронной почты получателя:{" "}
          <span className="font-semibold">{order.email}</span>
        </div>
        <div>
          <div>
            <div>
              Город/НП:{" "}
              <span className="font-semibold">{order.address.city}</span>
            </div>
            <div>
              Улица:{" "}
              <span className="font-semibold">{order.address.street}</span>
            </div>
            <div className="flex">
              <div>
                Дом/Строение:{" "}
                <span className="font-semibold">{order.address.house}</span>
              </div>
              {order.address.entrance && (
                <div className="ml-2">
                  Подьезд:{" "}
                  <span className="font-semibold">
                    {order.address.entrance}
                  </span>
                </div>
              )}
              {order.address.floor && (
                <div className="ml-2">
                  Этаж:{" "}
                  <span className="font-semibold">{order.address.floor}</span>
                </div>
              )}
              {order.address.flat && (
                <div className="ml-2">
                  Квартира:{" "}
                  <span className="font-semibold">{order.address.flat}</span>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="text-3xl mt-2">{order.finalPrice}₽</div>
      </div>
    </div>
  );
}
