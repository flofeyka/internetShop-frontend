import { useDispatch, useSelector } from "react-redux";
import { Image, Switch } from "@nextui-org/react";
import { useEffect } from "react";
import { getUserById } from "../../redux/profileSlice";
import GenderForm from "./Forms/GenderForm";
import InputForm from "./Forms/InputForm";

export default function Profile() {
  const [profileData, id, isOwner] = useSelector((state) => [
    state.Profile.profileData,
    state.Auth.user.id,
    state.Auth.user.isOwner,
  ]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserById(id));
  }, [dispatch, id]);

  return (
    <div className={"w-[65vw]"}>
      <div
        className={
          "min-h-[22.5vh]  transition-all bg-white rounded-[20px] shadow-xl hover:shadow-2xl"
        }
      >
        <div className="p-5">
          <div className={"flex items-center"}>
            <div>
              <Image
                src={"" || profileData.image}
                alt={"user"}
                className={
                  "rounded-full h-[75px] w-[75px] border-solid border-1 border-black mr-3.5"
                }
              />
            </div>
            <InputForm formName={"name"} name={profileData.name} />
          </div>
          <div className={"mt-5 flex"}>
            <div>
              <span className={"text-gray-400"}>Электронная почта</span>:{" "}
              <InputForm formName={"email"} name={profileData.email} />
              <div className="text-xl mt-3">
                <span className="text-gray-400">Статус</span>:{" "}
                <span className="font-semibold">
                  {isOwner ? "Администратор" : "Пользователь"}
                </span>
              </div>
            </div>
            <div className={"flex w-full justify-center"}>
              <GenderForm gender={profileData.gender} />
            </div>
            <div>
              <Switch>Получать уведомления</Switch>
            </div>
          </div>
        </div>
      </div>

      <div
        className={
          "w-full min-h-[20vh]  transition-all bg-white rounded-[20px] shadow-xl hover:shadow-2xl mt-5 justify-center"
        }
      >
        <div className={"p-5 flex"}>
          <div className={"h-[15vh] w-[20vw] rounded-[20px] bg-gray-100 mr-5"}>
            <div className={"p-3"}>
              <div className={"text-3xl font-bold"}>
                {profileData.amountOfOrders} ₽
              </div>
              <div className={"text-gray-400"}>Общая сумма заказов</div>
            </div>
          </div>

          <div className={"h-[15vh] w-[20vw] rounded-[20px] bg-gray-100 "}>
            <div className={"p-3"}>
              <div className={"text-3xl font-bold"}>
                {Math.round(profileData.percentOfBuyers)}%
              </div>
              <div className={"text-gray-400"}>Процент забранных заказов</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
