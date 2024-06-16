import { useState } from "react";
import DeleteModal from "./AdminModal";
import { Button } from "@nextui-org/react";

export default function AdminItem({
  id,
  currentUserId,
  image,
  name,
  ownProducts,
}) {
  const [deleteMode, setDeleteMode] = useState();

  return (
    <div className="mb-2 bg-white shadow-xl hover:shadow-2xl transition-all rounded-2xl min-h-[20vh] p-3">
      <DeleteModal
        deleteMode={deleteMode}
        setDeleteMode={(deleteMode) => setDeleteMode(deleteMode)}
        name={name}
        adminId={id}
      />
      <div className="flex">
        <div>
          <img alt="admin"
            className="h-[125px] w-[125px] rounded-full"
            src={"http://localhost:5000/" + image}
          />
          {id !== currentUserId && (
            <div className="flex w-full ">
              <Button
                color="danger"
                onClick={() => setDeleteMode(true)}
                className="w-full mt-2"
              >
                Удалить
              </Button>
            </div>
          )}
        </div>
        <div className="font-sans ml-3">
          <div className="text-3xl font-semibold">{name}</div>
          {id === currentUserId && <div>Это вы. И это прекрасно:)</div>}
          <div className="text-xl mt-3">
            Количество продуктов:{" "}
            <span className="font-semibold">{ownProducts.length} шт.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
