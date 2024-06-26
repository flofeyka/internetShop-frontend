import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Image, Input } from "@nextui-org/react";
import { useState } from "react";
import { setSearchText } from "../redux/productSlice";

export default function Header() {
  const image = useSelector((state) => state.Auth.user.image);
  const isOwner = useSelector((state) => state.Auth.user.isOwner);
  const dispatch = useDispatch();
  const [value, setValue] = useState();

  return (
    <header className={"flex bg-[#1aa4b8] border-b-1 text-white border-solid border-black justify-between px-4 py-1 items-center"}>
      <Link to={"/shop"} className={"text-5xl font-bold sm:hidden ml-5"}>
        TRILLIOONER
      </Link>
      <div className={"flex"}>
        <Input
          value={value}
          onKeyPress={(event) => {
            if (event.keyCode === 13) {
              dispatch(setSearchText(event.target.value));
            }
          }}
          onChange={(e) => setValue(e.target.value)}
          className={"w-[30vw] sm:w-[65vw]"}
          size={"lg"}
          placeholder={"Введите товар"}
        />
        <Button onClick={() => dispatch(setSearchText(value))} size={"lg"}>
          Поиск
        </Button>
      </div>
      <div className={"flex sm:hidden"}>
        <Link to={`/favourites`} className={"mr-3 flex flex-col items-center"}>
          <div>
            <img
              alt={"heart"}
              height={"25px"}
              width={"25px"}
              src={"/Icons/Heart.svg"}
            />
          </div>
          <div className={"mt-1"}>Избранное</div>
        </Link>
        <Link to={`/cart`} className={"mr-3 flex flex-col items-center"}>
          <div>
            <img
              alt={"cart"}
              height={"25px"}
              width={"25px"}
              src={"/Icons/Cart.svg"}
            />
          </div>
          <div className={"mt-1"}>Корзина</div>
        </Link>
        {isOwner && (
          <Link to="/myProducts" className="flex flex-col items-center">
            <img
              alt="my products"
              height="25px"
              width="29px"
              src="/Icons/myProducts.svg"
            />
            <div>Продукты</div>
          </Link>
        )}
        <Link to={`/lk`} className={"mr-3 flex flex-col items-center"}>
          <div>
            <Image
              lt={"profile"}
              className={
                "h-[50px] mx-2 w-[50px] rounded-full border-1 border-solid border-black"
              }
              src={image}
            />
          </div>
        </Link>
      </div>
    </header>
  );
}
