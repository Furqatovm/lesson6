import { useState } from "react";
import type { QueryType, TodoType } from "./@types";
import { useQueryHandler } from "./components/hooks/useQuery";
import Todos from "./components/todo";
import { Button } from "./components/ui/button"
import { Input } from "./components/ui/input"
import { Spinner } from "./components/ui/spinner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAxios } from "./components/hooks/useAxios";
import { DialogDemo } from "./components/modal";
import { ThemeProvider } from "./components/theme-provider"
import { ModeToggle } from "./components/mode-toggle";






const App = () => {
  const {data, isLoading, isPending}: QueryType<TodoType[]> =useQueryHandler({url:"todo", pathname:"todo"});

  const [title, setTitle] =useState("");
  const [isDone, setIsdone] =useState(false);
  const [isEdited, setIsEdited] =useState(false);
  const [editedTime, setEditedTime] =useState("");
  const [isOpenModal, setIsOpen] =useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [editValue, setEditValue] =useState("")


  console.log(title)

  const queryClient =useQueryClient()

  const axios =useAxios()
  const addTodoMutation = useMutation({
    mutationFn: (newTodo: TodoType) => axios({ url: "todo", method: "POST", body: newTodo }),
    onSuccess:  (createdTodo) => {
      // "todo" query cache'ni olish
      queryClient.setQueryData<TodoType[]>(["todo"], (oldData) => {
        return oldData ? [createdTodo, ...oldData] : [createdTodo]; // boshiga qo'shish
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) =>
      axios({ url: `todo/${id}`, method: "DELETE" }),
    onSuccess: (_, id) => {
      queryClient.setQueryData<TodoType[]>(["todo"], (old) =>
        old?.filter((todo) => todo.id !== id) ?? []
      );
    },
  });


  const editTodoMutation = useMutation({
    mutationFn: (payload: { id: number; title: string }) =>
      axios({
        url: `todo/${payload.id}`,
        method: "PUT", // yoki PATCH
        body: {
          title: payload.title,
          isEdited: true,
          editedTime: new Date().toISOString(),
        },
      }),
  
    onSuccess: (updatedTodo) => {
      queryClient.setQueryData<TodoType[]>(["todo"], (old) =>
        old?.map((todo) =>
          todo.id === updatedTodo.id ? updatedTodo : todo
        )
      )
    },
  })


  const openModal = () => {
    setIsOpen(true);
  };
  
  const closeModal = () => {
    setIsOpen(false);
  };
 
  
  
  return (
    <ThemeProvider defaultTheme ="dark" storageKey="vite-ui-theme">
    <section className="w-screen h-screen">
      <div className="fixed left-5 top-5">
      <ModeToggle  />

      </div>
      <div className="w-[60%] m-auto py-20">

       <form 
       onSubmit={(e) => {
        e.preventDefault();
        if (!title.trim()) return; 
        addTodoMutation.mutate({
          title: title.trim(),
          isDone: isDone,
          isEdited: isEdited,
          editedTime: editedTime,
        });
        setTitle("");
      }}
        className="flex justify-between items-center">
       <Input onChange={(e)=>setTitle(e.target.value)} value={title} className="w-[80%] text-white" />
       <Button type="submit" className="w-[18%] cursor-pointer">Add</Button>
       </form>

       <div className="flex flex-col gap-5 mt-10  w-[80%]   h-[60vh] overflow-y-auto overflowHidden">

        {data?.length == 0 ?<img src="https://img.freepik.com/premium-vector/modern-design-concept-no-data-found-design_637684-218.jpg?semt=ais_hybrid" alt="" /> :
        ""
        }
       {isPending ?
       <div className="flex items-center justify-center">
        <Spinner className="text-white" />
       </div>:
       data?.map((val) => (
        <Todos 
          key={val.id} 
          {...val} 
          onDelete={(id) => deleteMutation.mutate(id)}
          openModel ={openModal}
          onEdit={() => {
            setSelectedId(val.id)
            setEditValue(val.title)
            setIsOpen(true)
          }}
        />
      ))
      
       }
       </div>
       <DialogDemo 
        open={isOpenModal}
        onOpenChange={setIsOpen}
        value={editValue}
        onChange={setEditValue}
        isEditing ={editTodoMutation.isPending}
        closeModal={closeModal}
        onSave={() => {
          if (!selectedId) return
      
          editTodoMutation.mutate({
            id: selectedId,
            title: editValue.trim(),
          })
        }}
      />

      </div>
    </section>
    </ThemeProvider>
  )
}

export default App