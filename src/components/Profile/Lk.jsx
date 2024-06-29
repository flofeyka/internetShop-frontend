import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { LogoutSystem } from "../../redux/authSlice";
import { Link } from "react-router-dom";
import { getUserById } from "../../redux/profileSlice";
import { Image } from "@nextui-org/react";

export default function Lk() {
  const [id, profileData, isOwner] = useSelector((state) => [
    state.Auth.user.id,
    state.Profile.profileData,
    state.Auth.user.isOwner,
  ]);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserById(id));
  }, [dispatch, id]);

  return (
    <div>
      <div className={"flex sm:flex-col sm:items-center"}>
        <Link to={"/profile"}>
          <div className="transition-all w-[30vw]  sm:w-[100vw] bg-gray-100 cursor-grabbing lg:shadow-xl min-h-[20vh] lg:rounded-[15px] lg:hover:shadow-2xl lg:mr-5 sm:mb-2">
            <div className={"p-5"}>
              <div className={"flex items-center"}>
                <Image
                  src={profileData.image}
                  alt={"user"}
                  className={
                    "rounded-full w-[80px] h-[80px] flex justify-center items-center bg-[#171923] text-white"
                  }
                />
                <div className={"userName text-2xl ml-4"}>
                  {profileData.name}
                </div>
              </div>
              <div className={"flex justify-between mt-2"}>
                <div>
                  <span className={"text-gray-500 mr-2"}>
                    Элекронная почта{" "}
                  </span>{" "}
                  {profileData.email}
                </div>
                <div
                  onClick={() => dispatch(LogoutSystem())}
                  className={"text-gray-500 underline hover:text-black"}
                >
                  Выйти
                </div>
              </div>
            </div>
          </div>
        </Link>
        <Link to="/myOrders">
          <div
            className={
              "w-[25vw] sm:mb-2 sm:w-[90vw] sm:h-[10vh] transition-all cursor-grabbing shadow-xl lg:min-h-[20vh] bg-white rounded-[15px] hover:shadow-2xl"
            }
          >
            <div className={"p-5 flex flex-col items-baseline"}>
              <div className={"text-4xl sm:text-2xl font-bold"}>Мои заказы</div>
            </div>
          </div>
        </Link>
        <Link
          to={"/cart"}
          className={
            "w-[25vw] sm:mb-2 sm:w-[90vw] transition-all sm:h-[10vh] cursor-grabbing shadow-xl lg:min-h-[20vh] bg-white rounded-[15px] hover:shadow-2xl lg:ml-5"
          }
        >
          <div className={"p-5"}>
            <div className={"text-4xl sm:text-2xl font-bold"}>Корзина</div>
          </div>
        </Link>
      </div>
      <div className={"flex sm:flex-col lg:mt-5 sm:items-center"}>
        <Link
          to={"/favourites"}
          className={
            "w-[25vw] sm:w-[90vw] transition-all sm:h-[10vh] cursor-grabbing shadow-xl lg:min-h-[20vh] bg-white rounded-[15px] hover:shadow-2xl sm:mb-2"
          }
        >
          <div className={"p-5"}>
            <div className={"text-4xl sm:text-2xl font-bold"}>Любимое</div>
          </div>
        </Link>
        <Link to={"/takenOrders"}
          className={
            "w-[25vw] sm:w-[90vw] sm:h-[10vh] sm:mb-2 transition-all cursor-grabbing shadow-xl lg:min-h-[20vh] bg-white rounded-[15px] hover:shadow-2xl lg:ml-5"
          }
        >
          <div className={"p-5"}>
            <div className={"text-4xl sm:text-2xl font-bold"}>Покупки</div>
          </div>
        </Link>
        <Link to={"/historyViews"}>
          <div
            className={
              "w-[30vw] sm:w-[90vw] sm:mb-2 transition-all sm:h-[10vh] cursor-grabbing shadow-xl lg:min-h-[20vh] bg-white rounded-[15px] hover:shadow-2xl lg:ml-5"
            }
          >
            <div className={"p-5"}>
              <div className={"text-4xl sm:text-2xl font-bold"}>История просмотра</div>
            </div>
          </div>
        </Link>
      </div>

      {isOwner && (
        <div className="flex mt-5 sm:flex-col sm:items-center">
          <Link to={"/notVerifiedOrders"}>
            <div className="w-[30vw] sm:w-[90vw] sm:h-[10vh] transition-all cursor-grabbing shadow-xl lg:min-h-[20vh] bg-white rounded-[15px] hover:shadow-2xl sm:mb-2 lg:mr-5">
              <div className="text-4xl sm:text-2xl p-5 font-bold">
                Заказы
              </div>
            </div>
          </Link>

          <Link to="/notTakenOrders"
            className={
              "w-[25vw] sm:w-[90vw] sm:h-[10vh] sm:mb-2 transition-all cursor-grabbing shadow-xl lg:min-h-[20vh] bg-white rounded-[15px] hover:shadow-2xl"
            }
          >
            <div className={"p-5 flex flex-col items-baseline"}>
              <div className={"text-4xl sm:text-2xl font-bold"}>Действующие заказы</div>
            </div>
          </Link>
          <Link
            to={"/admins"}
            className={
              "w-[25vw] sm:w-[90vw] sm:h-[10vh]  transition-all cursor-grabbing shadow-xl lg:min-h-[20vh] bg-white rounded-[15px] hover:shadow-2xl sm:mb-2 lg:ml-5"
            }
          >
            <div className={"p-5"}>
              <div className={"text-4xl sm:text-2xl font-bold"}>Администраторы</div>
            </div>
          </Link>
        </div>
      )}
    </div>
  );
}
