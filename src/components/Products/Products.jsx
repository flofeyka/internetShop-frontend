import { Button, Radio, Select, SelectItem } from "@nextui-org/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getMyProducts } from "../../redux/productSlice";

export default function MyProducts() {
  const Products = useSelector((state) => state.Product.myProducts);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMyProducts());
  }, [dispatch]);

  return (
    <div>
      <div className="flex">
        <div className="min-h-[30vh] bg-white rounded-2xl mr-5 w-[50vw] shadow-2xl p-3">
          <div className="w-full flex justify-between border-b-1 border-black">
            <div className="text-3xl font-semibold">Мои товары</div>
            <div className="">
              <Select className="w-[250px]">
                <SelectItem>Все продукты</SelectItem>
                <SelectItem>Мои продукты</SelectItem>
              </Select>
            </div>
            <Link to="/createProduct">
              <Button className="font-semibold mb-2" color="primary">
                Создать товар
              </Button>
            </Link>
          </div>
          <div className="w-full mt-2">
            {Products.map((product) => {
              return (
                <div className="flex mb-2 bg-gray-100 shadow-xl hover:shadow-2xl max-w-[50vw] p-3 rounded-2xl">
                  <div>
                    <img
                      alt="product"
                      src={product.image}
                      className="min-w-[125px] h-[125px] rounded-2xl"
                    />
                  </div>
                  <div className="ml-3">
                    <Link
                      to={`/product/${product.id}`}
                      className="font-semibold text-2xl break-words flex flex-wrap"
                    >
                      {product.name}
                    </Link>
                    <div className="whitespace-nowrap text-ellipsis overflow-hidden max-w-[575px]">
                      {product.description}
                    </div>
                    <div className="font-semibold text-2xl mt-10">
                      {product.price}₽
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="h-[30vh] bg-white rounded-2xl w-[25vw] shadow-2xl p-3">
          <div className="border-b-1 border-solid border-black text-3xl">
            Итого
          </div>
        </div>
      </div>
    </div>
  );
}
