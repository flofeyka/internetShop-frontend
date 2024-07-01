import { Button } from "@nextui-org/react";
import { updateProductCount } from "../../redux/cartSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";

export default function Counter({ id, quantity, count }) {
  const dispatch = useDispatch();
  const [counter, setCounter] = useState(count);

  return (
    <div className={"flex items-center"}>
      <Button
        size={"sm"}
        onClick={() => {
          if (counter < quantity) {
            setCounter(counter + 1);
            dispatch(updateProductCount({ id, count: counter + 1 }));
          }

          return dispatch(updateProductCount({ id, count: counter }));
        }}
      >
        +
      </Button>
      <input
        className={
          "max-w-[40px] bg-gray-200 text-center rounded-[10px] h-[35px]"
        }
        defaultValue={1}
        onChange={(event) => {
          if (event.target.value > quantity) {
            return setCounter(quantity);
          }
          setCounter(event.target.value);
        }}
        value={counter}
        onBlur={() => dispatch(updateProductCount({ id, count: counter }))}
      />
      <Button
        onClick={() => {
          if (counter > 1) {
            setCounter(counter - 1);
            return dispatch(updateProductCount({ id, count: counter - 1 }));
          }
          setCounter(counter);
        }}
        size={"sm"}
      >
        -
      </Button>
    </div>
  );
}
