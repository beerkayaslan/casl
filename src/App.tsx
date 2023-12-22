import AbilityProvider ,{ Can } from './casl/ability.tsx';
import { subject } from "@casl/ability";
import { users } from './users.ts';
import React from "react";
import { useTodoStore } from "./store/useTodoStore.ts";

function App() {

    const { user, setUser, addTodo, delTodo, doneTodo, todos  } = useTodoStore((state) => state);

    const [text, setText] = React.useState<string>("");
    const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setUser(e.target.value)
    }

    const getUserName = React.useCallback((id: string) => {
        return users.find((user) => user.id === id)?.name;
    },[user]);


  return (
    <AbilityProvider>
        <div className="flex mx-auto w-[1100px] mt-4 ">
            <div className="border flex gap-2 p-4 w-[400px]">
                <div>Seçili Kullanıcı:</div>
                <select onChange={onChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
                    {
                        users.map((user) => {
                            return <option value={user.id} key={user.id}>{user.name}</option>
                        })
                    }
                </select>
            </div>

            <div className="border flex p-4 w-[600px] gap-2 items-center">
                <Can I="create" a="Todo">
                    <input
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Todo İçerik" value={text} type="text" onChange={(e) => setText(e.target.value)}/>
                    <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5" onClick={() => {
                        if(text.length > 0){
                            addTodo(text); setText("");
                        }
                    }}>Ekle</button>
                </Can>
            </div>
        </div>

        <div className="w-[1000px] mx-auto mt-4">
            {
                todos.length > 0 && todos.map((todo) =>
                    <Can I="read" this={subject("Todo", { userId: todo.userId })}>
                        <div key={todo.id} className={`border flex justify-between p-4 ${todo.done && "bg-green-100"}`}>
                            <div className="font-semibold">
                                <div><span className="text-gray-500">User Id:</span> {todo.userId}</div>
                                <div><span className="text-gray-500">User Name:</span> {getUserName(todo.userId)}</div>
                                <div><span className="text-gray-500">Text:</span> {todo.text} </div>
                            </div>
                            <div className="flex gap-2">
                                <Can I="delete" this={subject("Todo", {userId: todo.userId})}>
                                    <button onClick={() => delTodo(todo.id)} className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5">Sil</button>
                                </Can>
                                <Can I="update" this={subject("Todo", {userId: todo.userId})}>
                                    <button onClick={() => doneTodo(todo.id)} className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5">Tamamla</button>
                                </Can>
                            </div>
                        </div>
                     </Can>
                )
            }
        </div>
    </AbilityProvider>
  )
}

export default App
