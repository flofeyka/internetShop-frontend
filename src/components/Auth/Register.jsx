import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {RegisterSystem} from "../../redux/authSlice";
import {Button, Input} from "@nextui-org/react";
import {Link} from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import {useState} from "react";

export default function Register() {
    const {register, handleSubmit} = useForm();
    const dispatch = useDispatch();
    const [validCaptcha, setValidCaptcha] = useState(false);
    const onSubmit = data => {
        dispatch(RegisterSystem({...data, captcha: validCaptcha}));
    }

    return <form onSubmit={handleSubmit(onSubmit)} className="flex bg-[aliceblue] h-screen flex-col justify-center items-center">
        <div className={"min-h-[350px] max-h-[700px] min-w-[350px] max-w-[600px] bg-white rounded-[20px] shadow-2xl p-3"}>
            <div className={"my-5 flex flex-col items-center text-5xl font-sans"}>Регистрация</div>
            <div className={"mt-2"}>
                <Input size={"lg"} type={"email"} placeholder={"Электронная почта"} {...register("email", {required: true})}/>
            </div>
            <div className={"mt-2"}>
                <Input size={"lg"} placeholder={"Номер телефона"} {...register("phoneNumber", {required: true})}/>
            </div>
            <div className={"mt-2"}>
                <Input size={"lg"} placeholder={"Полное имя"} {...register("name", {required: true})}/>

            </div>
            <div className={"mt-2"}>
                <Input size={"lg"} type={"password"} placeholder={"Пароль"} {...register("password", {required: true})}/>
            </div>
            <div className={"flex flex-col mt-3 justify-center w-full"}>
                <Button size={"lg"} color={"primary"} type={"submit"}>Зарегистрироваться</Button>
                <div className={"mt-2 mx-auto block"}>Уже есть аккаунт? <Link to={"/login"}
                                                                              className={"text-primary-400 font-bold"}> Войдите</Link>
                </div>
            </div>

        </div>
    </form>
}