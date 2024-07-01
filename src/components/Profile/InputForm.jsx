import {useForm} from "react-hook-form";
import {useState} from "react";
import {Input} from "@nextui-org/react";
import {useDispatch} from "react-redux";
import {editProfileData} from "../../redux/profileSlice";

export default function InputForm({name, formName}) {
    const {register, handleSubmit} = useForm({
        defaultValues: {
            name: name
        }
    });

    const dispatch = useDispatch();

    const [editMode, setEditMode] = useState(false);
    const onSubmit = (data) => {
        setEditMode(false);
        dispatch(editProfileData(data));
    }

    return <form onSubmit={handleSubmit(onSubmit)}>
        {editMode ? <span><Input size={"lg"} autoFocus defaultValue={name} {...register(formName)} onBlur={handleSubmit(onSubmit)}
            /></span> : <div onDoubleClick={() => setEditMode(true)} className={"text-xl font-bold"}>{name}</div>}
    </form>
}