import {Link} from "react-router-dom";
import {Button} from "@nextui-org/react";
import {useEffect} from "react";
import {getViewsHistory} from "../redux/profileSlice";
import {useDispatch, useSelector} from "react-redux";

export default function HistoryViews() {
    const history = useSelector(state => state.Profile.viewsHistory)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getViewsHistory());
    }, []);
    return <div className={"mt-5 max-w-[55vw] flex justify-center"}>
        {history.map(purchase => {
            return <div
                className={"min-h-[150px] w-[60vw] rounded-[20px] bg-white shadow-2xl flex flex-col justify-center p-4"}>
                <div className={"p-2 flex"}>
                    <div><img height={"150px"} width={"150px"}
                              className={"rounded-[10px] border-solid border-black border-1"}/></div>
                    <div className={"ml-5 flex justify-between w-full"}>
                        <div className={"text-3xl font-semibold cursor-grabbing "}>
                            {purchase.name}
                        </div>
                        <div className={"text-xl"}>{purchase.price} ₽</div>
                    </div>
                </div>


            </div>
        })}
    </div>
}