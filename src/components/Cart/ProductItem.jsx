import {useEffect} from "react";
import {getCartList} from "../../redux/cartSlice";
import {useDispatch} from "react-redux";
import Counter from "../Counter";
import {Link} from "react-router-dom";

export default function ProductItem({id, image, name, finalProductPrice, quantity, count}) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCartList());
    }, [dispatch, count]);

    return <div
        className={"cursor-grabbing shadow-xl hover:shadow-2xl rounded-xl max-h-[20vh] bg-gray-100 p-3 flex mb-2"}>
        <div><img alt={"product"} src={"http://localhost:5000/" + image} className={"h-[100px] w-[120px] rounded-xl"}/></div>
        <div className={"ml-3 w-full"}>
            <div className={"text-3xl flex justify-between "}>
                <Link to={`/product/${id}`} className={"font-semibold "}>
                    {name}
                </Link>
                <div className={"font-sans"}>{finalProductPrice}₽</div>
            </div>
            <div className={"mt-2 text-2xl flex"}>
                <div className={"flex"}>
                    <Counter quantity={quantity} count={count} id={id}/>
                </div>
            </div>
        </div>
    </div>
}