import { useEffect } from "react";
import { getViewsHistory } from "../../redux/profileSlice";
import { useDispatch, useSelector } from "react-redux";
import ProductItem from "../../components/Shop/ProductItem";

export default function HistoryViews() {
  const history = useSelector((state) => state.Profile.viewsHistory);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getViewsHistory());
  }, [dispatch]);

  return (
    <div className={"lg:w-[75vw] sm:w-[95vw] sm:flex-col justify-center"}>
      <div className="p-3 bg-white rounded-2xl shadow-2xl w-[71.5vw] sm:w-[95vw] text-2xl font-semibold mb-5">
        История просмотра
      </div>
      {history.length === 0 && (
        <div className="p-3 bg-white rounded-2xl shadow-2xl w-[70vw] text-2xl text-center font-semibold">
          Пока что здесь пусто
        </div>
      )}{" "}
      <div className={"flex mx-auto justify-center flex-wrap sm:flex-col"}>
        {history.map(product => <ProductItem id={product.id} image={product.image} price={product.price} name={product.name}/>)}
      </div>
    </div>
  );
}
