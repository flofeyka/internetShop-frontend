import { useDispatch, useSelector } from "react-redux";
import { getNotVerifiedOrders } from "../../../redux/orderSlice";
import OrderItem from "./OrderItem";
import { useEffect } from "react";

export default function NotVerifiedOrders() {
  const NotVerifiedOrders = useSelector(
    (state) => state.Order.notVerifiedOrders
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getNotVerifiedOrders());
  }, [dispatch]);

  return (
    <div>
      <div className="p-3 bg-white rounded-2xl shadow-2xl w-[50vw] sm:w-[90vw] text-2xl font-semibold mb-5">
        Неподтвержденные заказы
      </div>
      {NotVerifiedOrders.length === 0 && (
        <div className="p-3 bg-white rounded-2xl shadow-2xl w-[50vw] sm:w-[90vw] text-2xl text-center font-semibold">
          Пока что здесь пусто
        </div>
      )}{" "}
      {NotVerifiedOrders.map((order) => (
        <OrderItem order={order} />
      ))}
    </div>
  );
}
