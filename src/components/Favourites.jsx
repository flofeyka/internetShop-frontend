import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { deleteFavourite, getAllFavourites } from "../redux/favouritesSlice";
import { Button } from "@nextui-org/react";
import {
  addOneToCart,
  deleteOneFromCart,
  getCartList,
} from "../redux/cartSlice";

export default function Favourites() {
  const [FavouritesList, cartList] = useSelector((state) => [
    state.Favourites.favourites,
    state.Cart.cartList,
  ]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllFavourites());
    dispatch(getCartList());
  }, [dispatch]);

  return (
    <div>
      <div className="p-3 bg-white rounded-2xl shadow-2xl w-[50vw] text-2xl font-semibold mb-5">
        Избранное
      </div>
      {FavouritesList.length === 0 && (
        <div className="p-3 bg-white rounded-2xl shadow-2xl w-[50vw] text-2xl text-center font-semibold">
          Пока что здесь пусто
        </div>
      )}{" "}
      <div>
        <div className={"flex mt-3 max-w-[75vw] flex-wrap h-auto"}>
          {FavouritesList.map((favourite) => {
            return (
              <div
                className={
                  "cursor-pointer border-b-1 mr-5 bg-white min-h-[300px] mb-5 w-[250px] rounded-2xl shadow-xl hover:shadow-2xl flex flex-col p-5"
                }
              >
                <div>
                  <img
                    alt={"Product"}
                    className={
                      "w-full h-[200px] rounded-xl border-solid border-black border-1"
                    }
                    src={"http://localhost:5000/" + favourite.image}
                  />
                </div>
                <div className={"text-2xl"}>{favourite.price}₽</div>
                <div className={"text-xl"}>{favourite.name}</div>
                <div className={"flex w-full justify-center mt-2"}>
                  {cartList.find((i) => i.id === favourite.id) ? (
                    <Button
                      onClick={() => dispatch(deleteOneFromCart(favourite.id))}
                      className={"w-full"}
                      size={"lg"}
                      variant={"faded"}
                    >
                      В корзине
                    </Button>
                  ) : (
                    <Button
                      onClick={() => dispatch(addOneToCart(favourite.id))}
                      className={"w-full"}
                      size={"lg"}
                      color={"primary"}
                    >
                      Добавить в корзину
                    </Button>
                  )}
                </div>
                <div>
                  <Button
                    size={"lg"}
                    className={"mt-2 w-full"}
                    onClick={() => dispatch(deleteFavourite(favourite.id))}
                  >
                    В избранных
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
