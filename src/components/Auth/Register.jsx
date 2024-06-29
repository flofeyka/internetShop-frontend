import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { RegisterSystem } from "../../redux/authSlice";
import { Button, Input } from "@nextui-org/react";
import { Link } from "react-router-dom";

export default function Register() {
    const { register, handleSubmit } = useForm();
    const dispatch = useDispatch();

    return <form onSubmit={handleSubmit((data) => dispatch(RegisterSystem({ email: data.email, phoneNumber: data.phoneNumber, password: data.password, name: data.name })))} className="flex bg-[aliceblue] h-screen flex-col justify-center items-center">
        <div className={"min-h-[60vh] max-h-[700px] min-w-[23vw] max-w-[600px] bg-white rounded-[20px] shadow-2xl p-3 sm:w-[90vw]"}>
            <div className={"my-8 flex flex-col items-center text-5xl font-semibold"}>Регистрация</div>
            <div className={"mt-2"}>
                <Input classNames={{
                    inputWrapper: "sm:h-[65px] h-[60px]",
                    input: "sm:placeholder:text-xl"
                }} size={"lg"} type={"email"} placeholder={"Электронная почта"} {...register("email", { required: true })} />
            </div>
            <div className={"mt-2"}>
                <Input size={"lg"} classNames={{
                    inputWrapper: "sm:h-[65px] h-[60px]",
                    input: "sm:placeholder:text-xl"
                }} placeholder={"Номер телефона"} {...register("phoneNumber", { required: true })} />
            </div>
            <div className={"mt-2"}>
                <Input size={"lg"} classNames={{
                    inputWrapper: "sm:h-[65px] h-[60px]",
                    input: "sm:placeholder:text-xl"
                }} placeholder={"Полное имя"} {...register("name", { required: true })} />

            </div>
            <div className={"mt-2"}>
                <Input size={"lg"} classNames={{
                    inputWrapper: "sm:h-[65px] h-[60px]",
                    input: "sm:placeholder:text-xl"
                }} type={"password"} placeholder={"Пароль"} {...register("password", { required: true })} />
            </div>
            <div className={"flex flex-col mt-3 justify-center w-full"}>
                <Button size={"lg"} color={"success"} className="h-[60px] text-white font-semibold text-[19px]" type={"submit"}>Зарегистрироваться</Button>
                <div className={"mt-2 mx-auto block text-[17px]"}>Уже есть аккаунт? <Link to={"/login"}
                    className={"text-primary-400 font-bold"}> Войдите</Link>
                </div>
            </div>

        </div>
    </form>
}