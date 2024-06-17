import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {Button, Input} from "@nextui-org/react";
import {LoginSystem} from "../../redux/authSlice";
import {Link} from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import {useState} from "react";

export default function Login() {
    const {register, handleSubmit} = useForm();
    const dispatch = useDispatch();
    const [validCaptcha, setValidCaptcha] = useState(false);
    const onSubmit = data => {
        dispatch(LoginSystem({...data, captcha:validCaptcha}));
    }

    return <form onSubmit={handleSubmit(onSubmit)}
                 className={"h-screen bg-[aliceblue] flex flex-col justify-center items-center"}>
        <div
            className={"bg-[white] p-3 rounded-[20px] shadow-2xl min-h-[325px] min-w-[300px] max-h-[450px] max-w-[550px] flex flex-col"}>
            <div className={"text-6xl font-sans w-full flex flex-col items-center mb-5 mt-2"}>Вход</div>
            <div>
                <div>
                    <Input size={"lg"} placeholder={"Электронная почта"} {...register("email", { required: true })}/>
                </div>
                <div className={"mt-2"}>
                    <Input size={"lg"} placeholder={"Пароль"} {...register("password", { required: true })}/>
                </div>
            </div>
            <div className={"flex flex-col mt-5"}>
                <Button size={"lg"} color={"primary"} type={"submit"}>Войти</Button>
                <div className={"mt-3"}>Ещё нет аккаунта? <Link to={"/register"}
                                                                className={"text-primary-400 font-bold"}>Зарегистрируйтесь</Link>
                </div>
            </div>
        </div>
    </form>
}