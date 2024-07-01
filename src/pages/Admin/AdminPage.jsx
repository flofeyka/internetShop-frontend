import { Button, Input, Modal, ModalContent } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOwners, setOwner } from "../../redux/profileSlice";
import AdminItem from "../../components/AdminPage/AdminItem";

export default function AdminList() {
  const [adminList, userId] = useSelector((state) => [
    state.Profile.AdminList,
    state.Auth.user.id,
  ]);


  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOwners());
  }, [dispatch]);

  const [addAdminModal, setAddAdminModal] = useState(false);
  const [email, setEmail] = useState();

  return (
    <div className="flex sm:flex-col sm:items-center">
      <Modal isOpen={addAdminModal} onOpenChange={setAddAdminModal}>
        <ModalContent className="p-3">
          <div className="text-3xl text-center mb-3 font-semibold">Добавить администратора</div>
          <div>Введите адрес электронной почты администратора</div>
          <Input onChange={(e) => setEmail(e.target.value)} value={email} label="Электронная почта"/>
          <Button size="lg" className="mt-2 font-semibold text-white" onClick={() => {
            dispatch(setOwner(email))
            setAddAdminModal(false);
            }} color="success">Добавить</Button>
        </ModalContent>
      </Modal>
      <div className="rounded-2xl lg:mr-5 min-w-[50vw]">
      <div className="p-3 bg-white rounded-2xl shadow-2xl w-[50vw] sm:w-[95vw] text-2xl font-semibold mb-5">Список администраторов</div>
      {adminList.length === 0 && <div className="p-3 bg-white rounded-2xl shadow-2xl w-[50vw] text-2xl text-center font-semibold">Пока что здесь пусто</div>}
        <div className="mt-2 sm:w-[95vw]">
          {adminList.map((admin) => {
            return <AdminItem id={admin.id} currentUserId={userId} image={admin.image} name={admin.name} ownProducts={admin.ownProducts}/>
          })}
        </div>
      </div>
      <div className="bg-white w-[20vw] sm:w-[95vw] max-h-[20vh] p-3 rounded-2xl shadow-2xl">
        <div className="text-2xl font-semibold border-b-1 border-black mb-2">
          Панель управления
        </div>
        <div>
          <Button className="w-full text-white font-semibold" onClick={() => setAddAdminModal(true)} color="success">
            Добавить администратора
          </Button>
        </div>
        <div className="border-t-1 border-black mt-2">
          <div className="text-xl">
            Общее количество:{" "}
            <span className="font-semibold">{adminList.length} чел.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
