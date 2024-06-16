import { useEffect } from "react";
import { getViewsHistory } from "../../redux/profileSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function HistoryViews() {
  const history = useSelector((state) => state.Profile.viewsHistory);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getViewsHistory());
  }, [dispatch, history]);

  return (
    <div className={"max-w-[75vw] justify-center"}>
      <div className="p-3 bg-white rounded-2xl shadow-2xl w-[71.5vw] text-2xl font-semibold mb-5">
        История просмотра
      </div>
      {history.length === 0 && (
        <div className="p-3 bg-white rounded-2xl shadow-2xl w-[70vw] text-2xl text-center font-semibold">
          Пока что здесь пусто
        </div>
      )}{" "}
      <div className={"flex mx-auto justify-center flex-wrap"}>
        {history.map((purchase) => {
          return (
            <Link
              to={`/product/${purchase.id}`}
              className={
                "cursor-grabbing mb-5 min-h-[150px] max-h-[150px] mr-5 w-[35vw] rounded-[20px] bg-white shadow-2xl flex flex-col justify-center p-3"
              }
            >
              <div className={" flex"}>
                <div>
                  <img
                    alt={"product"}
                    src={"http://localhost:5000/" + purchase.image}
                    className={
                      "rounded-2xl h-[125px] w-[150px] border-solid border-black border-1"
                    }
                  />
                </div>
                <div className={"ml-5 flex justify-between w-full"}>
                  <div className={"text-3xl font-sans cursor-grabbing"}>
                    {purchase.name}
                  </div>
                  <div className={"text-3xl flex ml-5 font-sans rounded-xl"}>
                    {purchase.price}₽
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
