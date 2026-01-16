
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog"
import { Input } from "../components/ui/input"


interface DialogDemoprops{
    open: boolean;
    onOpenChange:(open:boolean) =>void;
    value:string;
    onChange:(value:string) =>void;
    onSave:()=>void;
    isEditing?:boolean;
    closeModal:() =>void
}


export function DialogDemo({
    open,
  onOpenChange,
  value,
  onChange,
  onSave,
  isEditing,
  closeModal,
  
}:DialogDemoprops) {
  return (
    <Dialog open ={open} onOpenChange={onOpenChange}
    >
        
      <form >
        <DialogContent className="sm:max-w-106.25">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Input id="name-1" value={value} onChange={(e) =>onChange(e.target.value)} name="name" />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="button" onClick={() =>{
                onSave();
                closeModal()
            }}>{
                isEditing ? "Saving":
                "Save changes"
                }</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}