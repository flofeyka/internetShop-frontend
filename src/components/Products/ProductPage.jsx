import { Link, Navigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, editProduct, getProduct } from "../../redux/productSlice";
import { Button, Input, Modal, ModalContent, Textarea } from "@nextui-org/react";
import { addOneToCart, deleteOneFromCart, getCartList } from "../../redux/cartSlice";
import Counter from "../Counter";
import { addFavourite, deleteFavourite, getAllFavourites } from "../../redux/favouritesSlice";
import { useForm } from "react-hook-form";

export default function ProductPage() {
    const [productData, cartList, favouriteList] = useSelector(state => [
        state.Product.productData,
        state.Cart.cartList,
        state.Favourites.favourites
    ]);

    const id = useParams().id;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getProduct(id));
        dispatch(getCartList());
        dispatch(getAllFavourites());
    }, [dispatch, id]);

    const [editMode, setEditMode] = useState(false);
    const [modal, setModal] = useState(false);

    const { register, handleSubmit } = useForm();

    const productCartFound = cartList.find(i => i.id === productData.id);


    const onSubmit = (data) => {
        dispatch(editProduct({ id: productData.id, name: data.name, description: data.description, price: data.price }));
        setEditMode(false);
    }


    const [modalValue, setModalValue] = useState();

    return <form onSubmit={handleSubmit(onSubmit)} className={"h-[100%] flex"}>
        <Modal isOpen={modal} onOpenChange={setModal} >
            <ModalContent className="p-5">
                <div className="text-2xl font-semibold text-center mb-2">Вы действительно хотите удалить этот товар?</div>
                <div className="text-xl select-none">Напишите: "Я действительно хочу удалить этот товар."</div>
                <div className=""><Input size="lg" value={modalValue} onChange={(event) => setModalValue(event.target.value)} /></div>
                <Link to="/myProducts">
                    <Button disabled={modalValue !== "Я действительно хочу удалить этот товар."}
                        color={modalValue === "Я действительно хочу удалить этот товар." ? "danger" : "default"}
                        className="w-full mt-3" size="lg" onClick={() => {
                            <Navigate to="/myProducts" />
                            return dispatch(deleteProduct(productData.id));
                        }}>Удалить
                    </Button>
                </Link>
            </ModalContent>
        </Modal>

        <div className="bg-white rounded-2xl w-[70vw] shadow-2xl mb-5">
            <div className={"flex justify-between p-5"}>
                <div className={"flex w-full"}>
                    <img src={productData.image} className={"rounded w-[450px] h-[450px]"} alt={"product"} />
                    <div className={"ml-5 break-words w-full"}>
                        <div className={"font-semibold text-3xl w-full"}>
                            {editMode ? <Input {...register("name")} className="w-full" defaultValue={productData.name} size="lg" label="Имя товара" /> : <div>{productData.name}</div>}</div>
                        <div className={"mt-5"}>
                            <div className={"text-xl font-semibold mb-1"}>Описание</div>
                            <div className="break-words">
                                {editMode ? <Textarea {...register("description")} className="w-full" defaultValue={productData.description} size="lg" label="Описание" /> : <div>{productData.description}</div>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="ml-5">
            <div
                className={"bg-white shadow-2xl max-w-[350px]  w-[100%] p-5 min-h-[280px] rounded-2xl flex flex-col justify-between"}>
                <div className={"text-3xl font-semibold"}>
                    {editMode ? <Input {...register("price")} size="lg" defaultValue={productData.price} label="Стоимость" /> : <div>{productData.price}₽</div>}
                </div>
                <div className={"text-[15px] mt-2"}>
                    <div><b>Дата ближайшей доставки</b>: <div>15 июня</div></div>
                    <div><b>Исполнитель</b>: <div>{productData.owner}</div></div>
                </div>
                <div className={"flex w-full justify-center mt-2"}>
                    {productCartFound ? <div className={"flex w-full items-center"}>
                        <div className={"bg-gray-100 p-1.5 rounded-xl"}>
                            <Counter quantity={productData.quantity} id={productData.id}
                                count={productCartFound.count} />
                        </div>
                        <Button className={"w-full ml-2"} type="button" size={"lg"} variant={"faded"}
                            onClick={() => dispatch(deleteOneFromCart(productData.id))}>В корзине</Button>
                    </div> : <div className={"flex w-full"}>
                        <Button className={"w-full mr-2"} size={"lg"}>Купить сейчас</Button>
                        <Button className={"w-full"} size={"lg"} type="button" color={"primary"}
                            onClick={() => dispatch(addOneToCart(productData.id))}>В корзину</Button>
                    </div>}
                </div>
                <div className={"mt-2"}>
                    {favouriteList.find(i => i.id === productData.id) ? <Button onClick={() => dispatch(deleteFavourite(id))} size={"lg"} className={"w-full"} variant={"faded"}>В избранных</Button> :
                        <Button onClick={() => dispatch(addFavourite(id))} type="button" size={"lg"} className={"w-full"}>В избранное</Button>
                    }
                </div>

            </div>
            <div className="rounded-2xl bg-white shadow-2xl mt-5 p-3">
                <div>
                    {editMode ? <div>
                        <Button size="lg" className="w-full  font-semibold text-white" type="submit" color="success">Принять</Button>
                        <Button size="lg" className="w-full mt-2 font-semibold" type="button" onClick={() => setEditMode(false)} color="danger">Отменить</Button>
                    </div> : <div className="flex">
                        <Button onClick={() => setEditMode(true)} type="reset" color="primary" className="mr-3 w-full font-semibold" size="lg">Изменить</Button>
                        <Button color="danger" onClick={() => setModal(true)} type="button" className="w-full font-semibold" size="lg">
                            Удалить
                        </Button>
                    </div>}
                </div>
            </div>
        </div>
    </form>
}