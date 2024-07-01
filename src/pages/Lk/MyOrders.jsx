import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cancelOrder, getMyOrders, takeOrder } from "../../redux/orderSlice";
import { Button } from "@nextui-org/react";
import { Link } from "react-router-dom";

export default function MyOrders() {
  const myOrders = useSelector((state) => state.Order.myOrders);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMyOrders());
  }, [dispatch]);

  return (
    <div>
        <div className="p-3 bg-white rounded-2xl shadow-2xl w-[55vw] text-2xl font-semibold mb-5">Список заказов</div>
        {myOrders.length === 0 && <div className="p-3 bg-white rounded-2xl shadow-2xl w-[55vw] text-2xl text-center font-semibold">Пока что здесь пусто</div>}      <div>
        {myOrders.map((order) => {
          return (
            <div className="w-[55vw] bg-white rounded-2xl min-h-[25vh] shadow-xl hover:shadow-2xl mt-5 transition-all">
              {order.canceled === true && (
                <div className="w-[55vw] -p-3 min-h-[25vh] absolute flex justify-center items-center rounded-2xl opacity-80 text-3xl font-bold text-white z-100 bg-black">
                  Заказ отменен
                </div>
              )}
              {order.isTaken === true && (
                <div className="w-[55vw] -p-3 min-h-[25vh] absolute flex justify-center items-center rounded-2xl opacity-80 text-3xl font-bold text-white z-100 bg-black">
                  Заказ успешно забран.
                </div>
              )}
              <div className="flex p-3">
                <div>
                  <img alt="order"
                    className="rounded-2xl h-[150px] w-[150px]"
                    src={"https://internetshop-1.onrender.com/" + order.image}
                  />
                  {!order.canceled && !order.isTaken && order.isVerified && (
                    <div className="mt-2 w-full">
                      <Button className="w-full"
                        size="lg"
                        color="danger"
                        onClick={() => dispatch(cancelOrder(order.id))}
                      >
                        Отменить
                      </Button>
                      <div>
                      <Button onClick={() => dispatch(takeOrder(order.id))} className="mt-2 text-white font-semibold w-full" size="lg" color="success">
                        Заказ забран
                      </Button>
                      </div>
                    </div>
                  )}
                </div>
                <div className="ml-3 flex flex-col justify-between">
                  <Link
                    to={`/product/${order.productId}`}
                    className="text-2xl font-semibold"
                  >
                    {order.name}
                  </Link>
                  <div>
                    {" "}
                    Количество:{" "}
                    <span className="font-semibold">{order.count} шт.</span>
                    <div>
                      Статус{" "}
                      <span className="font-semibold">
                        {order.isVerified ? "Подтверждён" : "Не подтверждён"}
                      </span>
                    </div>
                    <div>
                      Был создан {new Date(order.createdAt).toLocaleString()}
                    </div>
                  </div>
                  <div className="font-sans text-2xl">{order.finalPrice}₽</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
