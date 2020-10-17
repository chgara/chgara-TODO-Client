/*
 ***Interfaces and types of listService
 */

export interface Itodo {
    id: number;
    todo: string;
    created_at: Date;
    username: string;
}
export type TodoList = Array<Itodo>;
