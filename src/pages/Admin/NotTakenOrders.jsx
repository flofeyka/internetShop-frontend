import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNotTakenOrders } from "../../redux/orderSlice";
import OrderItem from "../../components/OrderItem";

export default function NotTakenOrders() {
  const notTakenOrders = useSelector((state) => state.Order.notTakenOrders);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getNotTakenOrders());
  }, [dispatch]);

  return (
    <div>
      <div className="p-3 bg-white rounded-2xl shadow-2xl w-[50vw] sm:w-[90vw] text-2xl font-semibold mb-5">
        Действующие заказы
      </div>
      {notTakenOrders.length === 0 && (
        <div className="p-3 bg-white rounded-2xl shadow-2xl w-[50vw] sm:w-[90vw] text-2xl text-center font-semibold">
          Пока что здесь пусто
        </div>
      )}
      {notTakenOrders.map((order) => (
        <OrderItem order={order} />
      ))}
    </div>
  );
}
