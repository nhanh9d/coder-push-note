import { IconProps } from "types";

const DoneBtn = ({ disable = false, ...props }: IconProps) => (
  <button disabled={disable} type="button" onClick={props.mouseEventHandler} title="save note">
    Done
  </button>
);

export default DoneBtn;
