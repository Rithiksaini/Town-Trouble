import React, { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
function App() {
  const [todolist, setTodolist] = useState("");
  const [todolists, setTodolists] = useState([]);

  useEffect(() => {}, [todolists, todolist]);

  const addTask = () => {
    if (todolist.trim() !== "") {
      setTodolists([
        ...todolists,
        {
          id: todolists.length + 1,
          task: todolist,
          completed: false,
        },
      ]);

      setTodolist("");
    } else {
      alert("Please enter a task");
    }
  };

  const handleDelete = (id) => {
    setTodolists(todolists.filter((item) => item.id !== id));
    console.log(todolists);
  };

  return (
    <>
      <h1 className="m-5 bg-red-100 text-center">Todo list</h1>
      <div className="h-screen bg-red-100 flex justify-center p-5  ">
        <div className="relative flex justify-center h-[600px] w-[300px] border-4 border-black rounded-2xl bg-gray-50 shadow-2xl">
          <span className="absolute border border-black bg-black w-20 h-3 rounded-br-xl rounded-bl-xl" />
          <div className="h-full w-full rounded-2xl ">
            <div className="  w-full rounded-2xl h-full overflow-hidden">
              <h1 className="mt-2 p-2 text-center border-b-2 border-black">
                Your Todos
              </h1>
              <div className=" p-2 my-2 flex flex-col gap-3  w-full  ">
                {todolists.map(({ task, id }, i) => (
                  <div className=" rounded-md bg-black opacity-80 text-white px-5 flex items-center uppercase justify-between shadow-2xl shadow-teal-200   h-10 text-2xl">
                    <span className="p-2 capitalize text-md ">
                      {i + 1}. {task}
                    </span>
                    <button onClick={() => handleDelete(id)}>
                      <FaTrashAlt />
                    </button>
                  </div>
                ))}
              </div>
              <div className="absolute bottom-0 w-full p-2 flex gap-2 justify-between">
                <input
                  className="flex-1 p-2 rounded-lg shadow-2xl shadow-grey-200 focus:outline-none ring-offset-2 ring-teal-100 focus:ring-2 focus:ring-teal-800"
                  type="text"
                  name="todolist"
                  placeholder="Enter your task"
                  value={todolist}
                  onChange={(e) => setTodolist(e.target.value)}
                />
                <button
                  onClick={addTask}
                  className="size-10 text-3xl text-white border rounded-full bg-black hover:bg-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50 "
                >
                  +
                </button>
              </div>
            </div>
          </div>
          <span className="absolute -right-2 top-14  border-4 border-black h-8 rounded-md" />
          <span className="absolute -right-2 top-28  border-4 border-black h-12 rounded-md" />
          <span className="absolute -right-2 top-40  border-4 border-black h-12 rounded-md" />
        </div>
      </div>
    </>
  );
}
export default App;
