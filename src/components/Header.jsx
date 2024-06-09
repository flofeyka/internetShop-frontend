import {Input} from "@nextui-org/react";
import {Link} from "react-router-dom";

export default function Header() {
    return <header className={"flex bg-[white] border-b-1 border-solid border-black justify-between px-4 py-1 items-center"}>
        <div className={"text-3xl font-semibold "}>Интернет магазин</div>
        <div className={"mr-2 flex w-[350px]"}><Input size={"lg"} placeholder={"Введите товар"} variant={"faded"}/>
        </div>
        <div className={"flex"}>
            <Link to={`/favourites`} className={"mr-3 flex flex-col items-center"}>
                <div><img alt={"heart"} height={"25px"} width={"25px"} src={"/Icons/Heart.svg"}/></div>
                <div className={"mt-1"}>Избранное</div>
            </Link>
            <Link to={`/lk`} className={"mr-3 flex flex-col items-center"}>
                <div><img alt={"profile"} height={"25px"} width={"25px"} src={"/Icons/Profile.svg"}/></div>
                <div className={"mt-1"}>Профиль</div>
            </Link>
            <Link to={`/cart`} className={"mr-3 flex flex-col items-center"}>
                <div><img alt={"cart"} height={"25px"} width={"25px"} src={"/Icons/Cart.svg"}/></div>
                <div className={"mt-1"}>Корзина</div>
            </Link>
        </div>
    </header>
}