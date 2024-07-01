import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllFavourites } from "../../redux/favouritesSlice";
import ProductItem from "../../components/Shop/ProductItem";

export default function Favourites() {
  const FavouritesList = useSelector(state => state.Favourites.favourites);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllFavourites());
  }, [dispatch]);

  return (
    <div>
      <div className="p-3 bg-white rounded-2xl shadow-2xl w-[75vw] sm:w-[95vw] text-2xl font-semibold mb-5">
        Избранное
      </div>
      {FavouritesList.length === 0 && (
        <div className="p-3 bg-white rounded-2xl shadow-2xl w-[75vw] sm:w-[95vw] text-2xl text-center font-semibold">
          Пока что здесь пусто
        </div>
      )}{" "}
      <div>
        <div className={"flex mt-3 lg:max-w-[75vw] sm:w-[95vw] flex-wrap h-auto justify-center"}>
          {FavouritesList.map(({ name, id, image, price }) => <ProductItem id={id} image={image} price={price} name={name} />)}
        </div>
      </div>
    </div>
  );
}
