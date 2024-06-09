import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {LogoutSystem} from "../redux/authSlice";
import {Link} from "react-router-dom";
import {getUserById} from "../redux/profileSlice";

export default function Lk() {
    const [id, profileData] = useSelector(state => [
        state.Auth.user.id,
        state.Profile.profileData,
    ]);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getUserById(id));
    }, [dispatch, id]);

    return <div>
        <div className={"flex"}>
            <Link to={"/profile"}>
                <div
                    className="w-[30vw] cursor-grabbing shadow-xl min-h-[20vh] bg-white rounded-[15px] hover:shadow-2xl mr-5">
                    <div className={"p-5"}>
                        <div className={"flex items-center"}>
                            <img src={profileData.image} alt={"user"}
                                className={"rounded-full w-[80px] h-[80px] flex justify-center items-center bg-[#171923] text-white"}/>
                            <div className={"userName text-2xl ml-4"}>{profileData.name}</div>
                        </div>
                        <div className={"flex justify-between mt-2"}>
                            <div><span className={"text-gray-500 mr-2"}>Элекронная почта </span> {profileData.email}
                            </div>
                            <div onClick={() => dispatch(LogoutSystem())}
                                 className={"text-gray-500 underline hover:text-black"}>Выйти
                            </div>
                        </div>

                    </div>

                </div>
            </Link>

            <div className={"w-[25vw] cursor-grabbing shadow-xl min-h-[20vh] bg-white rounded-[15px] hover:shadow-2xl"}>
                <div className={"p-5 flex flex-col items-baseline"}>
                    <div className={"text-4xl font-bold"}>Доставки</div>
                    <div><span className={"text-gray-400"}>Ближайшая</span> не ожидается</div>
                </div>
            </div>
            <Link to={"/cart"}
                  className={"w-[25vw] cursor-grabbing shadow-xl min-h-[20vh] bg-white rounded-[15px] hover:shadow-2xl ml-5"}>
                <div className={"p-5"}>
                    <div className={"text-4xl font-bold"}>Корзина</div>
                </div>
            </Link>
        </div>
        <div className={"flex mt-5"}>
            <Link to={"/favourites"}
                  className={"w-[25vw] cursor-grabbing shadow-xl min-h-[20vh] bg-white rounded-[15px] hover:shadow-2xl "}>
                <div className={"p-5"}>
                    <div className={"text-4xl font-bold"}>Любимое</div>
                </div>
            </Link>
            <div
                className={"w-[25vw] cursor-grabbing shadow-xl min-h-[20vh] bg-white rounded-[15px] hover:shadow-2xl ml-5"}>
                <div className={"p-5"}>
                    <div className={"text-4xl font-bold"}>Покупки</div>
                </div>
            </div>
            <Link to={"/historyViews"}>
                <div
                    className={"w-[30vw] cursor-grabbing shadow-xl min-h-[20vh] bg-white rounded-[15px] hover:shadow-2xl ml-5"}>
                    <div className={"p-5"}>
                        <div className={"text-4xl font-bold"}>История просмотра</div>
                    </div>
                </div>
            </Link>

        </div>
    </div>

}