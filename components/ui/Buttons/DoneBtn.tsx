import { useUser } from "@/utils/useUser";
import { IconProps } from "types";

const DoneBtn = (props: IconProps) => {
  const { notes } = useUser();
  const isDisable = notes.filter(n => n.active).length > 0;

  return (
    <button disabled={isDisable} type="button" onClick={props.mouseEventHandler} title="save note">
      Done
    </button>
  )
};

export default DoneBtn;
