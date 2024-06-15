import { Button, Input, Modal, ModalContent } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOwners } from "../../redux/profileSlice";

export default function AdminList() {
  const adminList = useSelector((state) => state.Profile.AdminList);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOwners());
  }, [dispatch]);

  const [deleteMode, setDeleteMode] = useState();

  return (
    <div className="flex">
        <Modal isOpen={deleteMode} onOpenChange={setDeleteMode}>
            <ModalContent className="p-3">
                <div className="text-2xl text-center">Вы действительно хотите удалить этого администратора?</div>
                <div className="mt-2 font-bold">Напишите "Я действительно хочу удалить этого администратора."</div>
                <Input className="mt-1" placeholder="Я действительно хочу удалить этого администратора"/>
                <Button className="mt-2">Удалить</Button>
            </ModalContent>
        </Modal>
      <div className="rounded-2xl p-3 mr-5 min-w-[50vw] min-h-[25vh]">
        <div className="font-semibold border-b-1 border-black text-2xl bg-white rounded-xl p-2 ">
          Список администраторов
        </div>
        <div className="mt-2">
          {adminList.map((admin) => {
            return (
              <div className="mb-2 bg-white shadow-xl hover:shadow-2xl transition-all rounded-2xl min-h-[20vh] p-3">
                <div className="flex">
                  <div>
                    <img
                      className="h-[125px] w-[125px] rounded-full"
                      src={admin.image}
                    />
                    <div className="flex w-full ">
                      <Button color="danger" onClick={() => setDeleteMode(true)} className="w-full mt-2">Удалить</Button>
                    </div>
                  </div>
                  <div className="text-3xl font-semibold font-sans ml-3">
                    <div>{admin.name}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="bg-white w-[20vw] max-h-[20vh] p-3 rounded-2xl shadow-2xl">
        <div className="text-2xl font-semibold border-b-1 border-black mb-2">
          Панель управления
        </div>
        <div>
          <Button className="w-full text-white font-semibold" color="success">
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
