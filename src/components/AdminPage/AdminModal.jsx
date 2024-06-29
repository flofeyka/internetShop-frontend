import { Button, Input, Modal, ModalContent } from "@nextui-org/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteOwner } from "../../redux/profileSlice";

export default function DeleteModal({ deleteMode, setDeleteMode, name, adminId }) {
    const dispatch = useDispatch();
  
    const [value, setValue] = useState();
  
    return(
      <Modal isOpen={deleteMode} onOpenChange={setDeleteMode}>
        <ModalContent className="p-3">
          <div className="text-2xl text-center">
            Вы действительно хотите удалить администратора {name}?
          </div>
          <div className="mt-2 font-bold">
            Напишите "Я действительно хочу удалить этого администратора."
          </div>
          <Input
            className="mt-1"
            onChange={(event) => setValue(event.target.value)}
            value={value}
            placeholder="Я действительно хочу удалить этого администратора."
          />
          <Button
            className="mt-2"
            size="lg"
            disabled={
              value !== "Я действительно хочу удалить этого администратора."
            }
            color={
              value === "Я действительно хочу удалить этого администратора."
                ? "danger"
                : "default"
            }
            onClick={() => {
              setValue("");
              setDeleteMode(false);
              dispatch(deleteOwner(adminId));
            }}
          >
            Удалить
          </Button>
        </ModalContent>
      </Modal>
    );
  }