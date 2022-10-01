import { useUser } from "@/utils/useUser";
import { IconProps } from "types";

const NewBtn = (props: IconProps) => {
  
  const { notes } = useUser();
  const isDisable = notes.filter(n => !n.content && n.active).length > 0;

  return (
    <button type="button" disabled={isDisable} onClick={props.mouseEventHandler} title="add a new note">
      <svg
        className="h-8 w-8 text-gray-500 inline-block"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" />
        <path d="M14 3v4a1 1 0 0 0 1 1h4" />
        <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
        <line x1="12" y1="11" x2="12" y2="17" />
        <line x1="9" y1="14" x2="15" y2="14" />
      </svg>
    </button>
  )
};

export default NewBtn;
