import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Button, Input } from "@nextui-org/react";
import { LoginSystem } from "../../redux/authSlice";
import { Link } from "react-router-dom";

export default function Login() {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();

  return (
    <form
      onSubmit={handleSubmit((data) =>
        dispatch(LoginSystem({ email: data.email, password: data.password }))
      )}
      className={
        "h-screen bg-[aliceblue] flex flex-col justify-center items-center"
      }
    >
      <div
        className={
          "bg-white p-3 rounded-[20px] justify-between shadow-2xl min-h-[375px] min-w-[350px] max-h-[450px] sm:w-[92.5vw] sm:min-h-[45vh] sm:justify-between max-w-[550px] flex flex-col"
        }
      >
        <div
          className={
            "text-8xl sm:text-8xl font-sans w-full flex flex-col sm:justify-center items-center mb-7 mt-2"
          }
        >
          Вход
        </div>
        <div>
          <div>
            <Input classNames={{
              inputWrapper: "sm:h-[65px] h-[55px]",
              input: "sm:placeholder:text-xl"
            }}
              size="lg"
              placeholder={"Электронная почта"}
              {...register("email", { required: true })}
            />
          </div>
          <div className={"mt-2"}>
            <Input classNames={{
              inputWrapper: "sm:h-[65px] h-[55px]",
              input: "sm:placeholder:text-xl"

            }}
              size={"lg"}
              type="password"
              placeholder={"Пароль"}
              {...register("password", { required: true })}
            />
          </div>
        </div>
        <div className={"flex flex-col mt-5"}>
          <Button size={"lg"} className="h-[50px] text-white font-semibold" color={"success"}  type={"submit"}>
            Войти
          </Button>
          <div className={"mt-3 text-[18px] flex justify-center"}>
            Ещё нет аккаунта?{" "}
            <Link to={"/register"} className={"text-primary-400 font-bold ml-1"}>
              Зарегистрируйтесь
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
}
