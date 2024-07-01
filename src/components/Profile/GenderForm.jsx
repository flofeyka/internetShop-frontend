import {Radio, RadioGroup} from "@nextui-org/react";
import {useForm} from "react-hook-form";

export default function GenderForm({gender}) {
    const {register, handleSubmit} = useForm({
        defaultValues: {
            gender: null
        }
    })

    return <form onSubmit={handleSubmit((data) => console.log(data))}>
        <RadioGroup className="sm:my-3" defaultValue={null} type="submit" {...register("gender")} label={"Пол"}>
            <Radio value={"male"}>Мужской</Radio>
            <Radio value={"female"}>Женский</Radio>
            <Radio value={"null"}>Не важно</Radio>
        </RadioGroup>
    </form>
}