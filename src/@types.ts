export interface TodoType {
    id?:number;
    title:string;
    isDone:boolean;
    isEdited:boolean;
    editedTime:string;
    createdTime:string;
}

export interface QueryType<T>{
    data?:T[];
    isLoading:boolean;
    isPending?:boolean;
}


