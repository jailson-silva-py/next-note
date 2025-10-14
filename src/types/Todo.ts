export interface Todo {

    title: string;
    id?: number;
    description: string;
    userId?: string;
    createdAt?: Date;

}

export interface TodoByText {

    tarefas:{
    
    id: number;
    title: string;
    description: string;
    userId: string;
    createdAt: Date;
    }[], 
    tamanho:number,
    search:string


}