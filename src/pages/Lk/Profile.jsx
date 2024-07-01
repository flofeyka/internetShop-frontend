import { useDispatch, useSelector } from "react-redux";
import { Image, Switch } from "@nextui-org/react";
import { useEffect } from "react";
import { getUserById, uploadUsersImage } from "../../redux/profileSlice";
import GenderForm from "../../components/Profile/GenderForm";
import InputForm from "../../components/Profile/InputForm";


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
    <div className={"w-[65vw] sm:w-[95vw] sm:mb-5"}>
      <div
        className={
          "min-h-[22.5vh]  transition-all bg-white rounded-[20px] shadow-xl hover:shadow-2xl"
        }
      >
        <div className="p-5">
          <div className={"flex items-center"}>
            <label>
              <Image
                src={profileData.image}
                alt={"user"}
                className={
                  "rounded-full h-[75px] w-[75px] border-solid border-1 border-black mr-3.5 cursor-grabbing"
                }
              />
              <input type="file" accept={"image/*"} onChange={(e) => dispatch(uploadUsersImage(e.target.files[0]))} hidden className="w-[75px] h-[75px] rounded-full"/>
            </label>
            <InputForm formName={"name"} name={profileData.name} />
          </div>
          <div className={"mt-5 flex sm:flex-col"}>
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
            <div className={"flex w-full justify-center sm:justify-start"}>
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
        <div className={"p-5 flex sm:flex-col"}>
          <div className={"h-[15vh] w-[20vw] sm:h-full sm:w-full sm:mb-2 rounded-[20px] bg-gray-100 mr-5"}>
            <div className={"p-3 sm:flex sm:justify-between sm:items-center"}>
              <div className={"text-3xl sm:text-2xl font-bold"}>
                {profileData.amountOfOrders} ₽
              </div>
              <div className={"text-gray-400"}>Общая сумма заказов</div>
            </div>
          </div>

          <div className={"h-[15vh] sm:h-full w-[20vw] sm:w-full rounded-[20px] bg-gray-100"}>
            <div className={"p-3 sm:flex sm:justify-between sm:items-center"}>
              <div className={"text-3xl sm:text-2xl font-bold"}>
                {Math.round(profileData.percentOfBuyers)}%
              </div>
              <div className={"text-gray-400"}>Забранных заказов</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
