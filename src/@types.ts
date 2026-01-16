export interface TodoType {
    id?:number;
    title:string;
    isDone:boolean;
    isEdited:boolean;
    editedTime:string|null;
    createdTime:string;
}

export interface QueryType<T> {
    data?: T;
    isLoading: boolean;
    isPending?: boolean;
  }
