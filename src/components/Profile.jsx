import {useDispatch, useSelector} from "react-redux";
import {Checkbox, Radio, RadioGroup} from "@nextui-org/react";
import {useEffect} from "react";
import {getUserById} from "../redux/profileSlice";

export default function Profile() {
    const [profileData, id] = useSelector(state => [state.Profile.profileData, state.Auth.user.id]);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getUserById(id));
    }, [dispatch, id]);

    return <div>
        <div className={"w-[60vw] min-h-[22.5vh] bg-white rounded-[20px] shadow-xl hover:shadow-2xl"}>
            <div className="p-5">
                <div className={"flex items-center"}>
                    <div><img src={profileData.image} alt={"user"} height={"75px"} width={"75px"}
                              className={"rounded-full border-solid border-1 border-black mr-3.5"}/></div>
                    <div className={"text-xl font-bold"}>{profileData.name}</div>
                </div>
                <div className={"mt-5 flex"}>
                    <div>
                        <span className={"text-gray-400"}>Электронная почта</span>: {profileData.email}
                    </div>
                    <div className={"flex w-full justify-center"}>
                        <RadioGroup defaultValue={"dontMatter"} label={"Пол"}>
                            <Radio value={"male"}>Мужской</Radio>
                            <Radio value={"female"}>Женский</Radio>
                            <Radio value={"dontMatter"}>Не важно</Radio>
                        </RadioGroup>
                    </div>
                    <div>
                        <Checkbox>Получать уведомления</Checkbox>
                    </div>
                </div>
            </div>

        </div>

        <div className={"w-[60vw] min-h-[20vh] bg-white rounded-[20px] shadow-xl hover:shadow-2xl mt-5 justify-center"}>
            <div className={"p-5 flex"}>
                <div className={"h-[15vh] w-[20vw] rounded-[20px] bg-gray-100 mr-5"}>
                    <div className={"p-3"}>
                        <div className={"text-3xl font-bold"}>1700</div>
                        <div className={"text-gray-400"}>Общая сумма заказов</div>
                    </div>
                </div>

                <div className={"h-[15vh] w-[20vw] rounded-[20px] bg-gray-100 "}>
                    <div className={"p-3"}>
                        <div className={"text-3xl font-bold"}>55%</div>
                        <div className={"text-gray-400"}>Процент забранных заказов</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}