import {useEffect} from "react";
import {getViewsHistory} from "../../redux/profileSlice";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";

export default function HistoryViews() {
    const history = useSelector(state => state.Profile.viewsHistory)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getViewsHistory());
    }, [dispatch, history]);

    return <div className={"max-w-[75vw] justify-center"}>
        <div className={"text-4xl flex justify-center font-semibold mb-5"}>История просмотра</div>
        <div className={"flex justify-center flex-wrap"}>
            {history.map(purchase => {
                return <Link to={`/product/${purchase.id}`}
                             className={"cursor-grabbing mb-5 min-h-[150px] max-h-[150px] mr-5 w-[35vw] rounded-[20px] bg-white shadow-2xl flex flex-col justify-center p-3"}>
                    <div className={" flex"}>
                        <div><img alt={"product"} src={purchase.image}
                                  className={"rounded-2xl h-[125px] w-[150px] border-solid border-black border-1"}/>
                        </div>
                        <div className={"ml-5 flex justify-between w-full"}>
                            <div className={"text-3xl font-sans cursor-grabbing"}>
                                {purchase.name}
                            </div>
                            <div className={"text-3xl flex ml-5 font-sans rounded-xl"}>{purchase.price}₽</div>
                        </div>
                    </div>


                </Link>
            })}
        </div>
    </div>
}