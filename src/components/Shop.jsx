import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getProducts, setCurrentPage, setSort } from "../redux/productSlice";
import { Button, Pagination, Select, SelectItem } from "@nextui-org/react";
import {
  addOneToCart,
  deleteOneFromCart,
  getCartList,
} from "../redux/cartSlice";
import { Link } from "react-router-dom";

export default function Shop() {
  const [productList, metaData, cartList, currentPage, sort, search] =
    useSelector((state) => [
      state.Product.productList,
      state.Product.metaData,
      state.Cart.cartList,
      state.Product.currentPage,
      state.Product.sort,
      state.Product.search,
    ]);
  const dispatch = useDispatch();

  const [values, setValues] = useState(new Set([]));

  const handleSelectionChange = (e) => {
    setValues(new Set(e.target.value.split(",")));
  };

  useEffect(() => {
    dispatch(setSort(Array.from(values).join(", ")));
    dispatch(getProducts());
    dispatch(getCartList());
  }, [dispatch, values, currentPage, sort, search]);

  return (
    <div className={"flex flex-col items-center"}>
      <div className="flex items-center">
        <Pagination
          onChange={(data) => setCurrentPage(data)}
          defaultValue={metaData.pageNumber}
          total={metaData.totalPages}
          size={"lg"}
          className={"mb-2"}
          variant={"faded"}
        />
        <div>
          <Select
            variant="faded"
            defaultSelectedKeys={["popularity"]}
            selectedKeys={values}
            value={values}
            onChange={handleSelectionChange}
            className="w-[250px] ml-2 mb-4"
          >
            <SelectItem key="popularity">Сначала популярные</SelectItem>
            <SelectItem key="expensive">Сначала дорогие</SelectItem>
            <SelectItem key="cheap">Сначала дешевые</SelectItem>
          </Select>
        </div>
      </div>

      <div className={"flex flex-wrap justify-center"}>
        {productList.map((i) => {
          return (
            <div
              className={
                "w-[350px] min-h-[400px] bg-white rounded-2xl mb-5 shadow-2xl flex p-3 lg:mr-5"
              }
            >
              <div className={"flex flex-col items-center mx-auto w-full"}>
                <img
                  alt={"product"}
                  src={"https://internetshop-1.onrender.com/" + i.image}
                  className={
                    "min-h-[300px] h-[300px] w-full rounded-xl border-1 border-solid border-black"
                  }
                />
                <Link
                  to={`/product/${i.id}`}
                  className={"font-semibold text-3xl"}
                >
                  {i.name}
                </Link>
                <div className={"font-sans text-2xl mt-1"}>{i.price}₽</div>
                {cartList.find((item) => item.id === i.id) ? (
                  <div className={"flex w-full items-end h-full"}>
                    <Button
                      onClick={() => dispatch(deleteOneFromCart(i.id))}
                      className={"w-full"}
                      size={"lg"}
                      variant={"faded"}
                    >
                      В корзине
                    </Button>
                    <Button size={"lg"}></Button>
                  </div>
                ) : (
                  <div className={"flex w-full items-end h-full"}>
                    <Button
                      onClick={() => dispatch(addOneToCart(i.id))}
                      size={"lg"}
                      color={"primary"}
                      className={"w-full"}
                    >
                      Добавить в корзину
                    </Button>
                    <Button size={"lg"}></Button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
