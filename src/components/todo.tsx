import type { TodoType } from "@/@types";
import { Checkbox } from "../components/ui/checkbox";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { Alert } from "./ui/alert";
type TodosProps = TodoType & {
    onDelete: (id: number) => void;
    openModel: () => void
    onEdit:() =>void
  };

const Todos = ({id, title,  onDelete, onEdit}:TodosProps) => {
  return (
    <Alert className="flex justify-between">

            
          <div className="flex gap-3 items-center">
            <Checkbox />
          <span className="dark:text-white light:text-black">{title}</span>

          </div>


        
          <div className="flex gap-4 items-center">
            <span className="dark:text-white light:text-black text-[18px] cursor-pointer">
            <MdDelete onClick={()=> onDelete(id as number)} />
            </span>

            <span className="dark:text-white light:text-black text-[18px]">
            <MdEdit   className="cursor-pointer"
            onClick={onEdit}
             />
            </span>

          </div>
        </Alert>
  )
}

export default Todos