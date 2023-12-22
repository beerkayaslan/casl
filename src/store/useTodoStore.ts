import { create } from 'zustand';
import { v4 as uuid } from 'uuid';
import { users, Users} from "../users.ts";

type TodoItem = {
    id: string,
    text: string,
    done: boolean,
    userId: string,
}

type Store = {
    todos: TodoItem[],
    user: Users,
    addTodo: (text: string) => void,
    delTodo: (id: string) => void,
    setUser: (id: string) => void,
    doneTodo: (id: string) => void,
}

export const useTodoStore = create<Store>()((set) => ({
    todos: [],
    user: users[0],
    setUser: (id: string) => set(() => ({ user: users.find((user) => user.id === id) })),
    addTodo: (text: string) => set((state) => ({ todos: [...state.todos, { id: uuid(), text, done: false, userId: state.user.id }] })),
    delTodo: (id: string) => set((state) => ({ todos: state.todos.filter((todo) => todo.id !== id) })),
    doneTodo: (id: string) => set((state) => ({ todos: state.todos.map((todo) => todo.id === id ? { ...todo, done: !todo.done } : todo) })),
}))
