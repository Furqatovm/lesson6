import type { TodoType } from "@/@types";
import { Checkbox } from "../components/ui/checkbox";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
type TodosProps = TodoType & {
    onDelete: (id: number) => void;
  };

const Todos = ({id, title, isDone,editedTime, isEdited, onDelete}:TodosProps) => {
  return (
    <div className="flex justify-between bg-[#171717] p-2 rounded-lg px-3">

          <div className="flex gap-3 items-center">
            <Checkbox />
          <span className="text-white">{title}</span>

          </div>



          <div className="flex gap-4 items-center">
            <span className="text-white text-[18px]">
            <MdDelete onClick={()=> onDelete(id)} />
            </span>

            <span className="text-white text-[18px]">
            <MdEdit />
            </span>

          </div>
        </div>
  )
}

export default Todos