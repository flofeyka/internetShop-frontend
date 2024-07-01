import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getProducts, setCurrentPage, setSort } from "../redux/productSlice";
import { Pagination, Select, SelectItem } from "@nextui-org/react";
import {getCartList} from "../redux/cartSlice";
import ProductItem from "../components/Shop/ProductItem";

export default function Shop() {
  const [productList, metaData, currentPage, sort, search] =
    useSelector((state) => [
      state.Product.productList,
      state.Product.metaData,
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
      {metaData.totalPages > 50 && <div className="flex items-center">
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
      </div>}

      <div className={"flex flex-wrap justify-center"}>
        {productList.map(product => <ProductItem id={product.id} image={product.image} price={product.price} name={product.name} ownerName={product.owner.name}/>)}
      </div>
    </div>
  );
}
