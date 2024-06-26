import { Button, Input, Textarea } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { createProduct } from "../../redux/productSlice";

export default function CreateProduct() {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const dispatch = useDispatch();

    const onSubmit = async (data) => {
        dispatch(createProduct(data));
        window.open("/myProducts", "_self");
    }


    return <form onSubmit={handleSubmit(onSubmit)} className="w-[70vw] min-h-[50vh] rounded-2xl bg-white shadow-2xl flex flex-col p-5">
        <div className="flex flex-col">
            <div className="flex mb-5">
                <Input className="w-[50%] mr-5" size="lg" {...register("name", { required: "Это поле обязательно" })} aria-invalid={errors.name ? "true" : "false"} required label="Имя товара" />
                <Input className="w-[50%]" size="lg" label="Вид товара" {...register("sort", { required: true })} required />
            </div>
            <Textarea className="mb-5" size="lg" {...register("description", { required: true })} required label="Описание товара" />
        </div>
        <div className="flex">
            <Input className="w-[50%] mr-5" {...register("price", { required: true })} size="lg" required label="Цена (в рублях)" />
            <Input className="w-[50%]" {...register("quantity", { required: true })} size="lg" label="Количество товара" required />
        </div>
        <div className="mt-5">
            <a href="/myProducts">
                <Button className="w-full h-[55px]" size="lg" color="primary" type="submit">Добавить</Button>
            </a>
        </div>
    </form>
}