import { useDispatch, useSelector } from "react-redux";
import { getTakenOrders } from "../../../redux/orderSlice";
import OrderItem from "./OrderItem";
import { useEffect } from "react";

export default function TakenOrders() {
  const takenOrders = useSelector((state) => state.Order.takenOrders);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTakenOrders());
  }, [dispatch]);

  return (
    <div>
      <div className="p-3 bg-white rounded-2xl shadow-2xl w-[50vw] sm:w-[90vw] text-2xl font-semibold mb-5">
        История заказов
      </div>
      {takenOrders.length === 0 && (
        <div className="p-3 bg-white rounded-2xl shadow-2xl w-[50vw] sm:w-[90vw] text-2xl text-center font-semibold">
          Пока что здесь пусто
        </div>
      )}
      {takenOrders.map((order) => (
        <OrderItem order={order} />
      ))}
    </div>
  );
}
