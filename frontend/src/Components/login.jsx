import React, { useState } from "react";
import { Trash2, CheckCircle } from "lucide-react";

const App = () => {
  const [todolist, setTodolist] = useState("");
  const [todolists, setTodolists] = useState([]);

  const addTask = () => {
    if (todolist.trim() !== "") {
      setTodolists([
        ...todolists,
        {
          id: Date.now(),
          task: todolist,
          isNew: true,
          completed: false,
        },
      ]);
      setTodolist("");

      setTimeout(() => {
        setTodolists((prev) => prev.map((todo) => ({ ...todo, isNew: false })));
      }, 500);
    } else {
      alert("Add a new Task");
    }
  };

  const handleDelete = (id) => {
    // First update the item's style to trigger animation
    setTodolists((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, isDeleting: true } : todo
      )
    );

    // Remove the item after animation completes
    setTimeout(() => {
      setTodolists((prev) => prev.filter((todo) => todo.id !== id));
    }, 500); // Match this with animation duration
  };

  const toggleComplete = (id) => {
    setTodolists((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4 flex items-center justify-center">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
          Todo List
        </h1>

        <div className="flex gap-2 mb-6">
          <input
            type="text"
            value={todolist}
            onChange={(e) => setTodolist(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTask()}
            placeholder="Add a task..."
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500
                     transition-all duration-300 hover:shadow-md"
          />
          <button
            onClick={addTask}
            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg 
                     hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 
                     transition-all duration-300 hover:shadow-lg transform hover:scale-105 active:scale-95"
          >
            Add
          </button>
        </div>

        <div className="space-y-3">
          {todolists.map((item) => (
            <div
              key={item.id}
              className={`
                flex items-center justify-between p-4 bg-white rounded-lg group
                transform transition-all duration-500 ease-in-out
                hover:shadow-md origin-top
                ${item.completed ? "bg-green-50" : "hover:scale-[1.02]"}
                ${item.isNew ? "animate-slide-in" : ""}
                ${item.isDeleting ? "animate-delete" : ""}
              `}
            >
              <div className="flex items-center gap-3 flex-1">
                <button
                  onClick={() => toggleComplete(item.id)}
                  className={`
                    transform transition-all duration-300
                    ${
                      item.completed
                        ? "text-green-500 rotate-0"
                        : "text-slate-300 rotate-180 hover:text-green-500"
                    }
                    hover:scale-110 active:scale-95
                  `}
                >
                  <CheckCircle className="h-6 w-6" />
                </button>
                <span
                  className={`
                  text-slate-700 transition-all duration-300
                  ${item.completed ? "line-through text-slate-400" : ""}
                `}
                >
                  {item.task}
                </span>
              </div>
              <button
                onClick={() => handleDelete(item.id)}
                className="text-slate-400 hover:text-red-500 transition-all duration-300 p-1 rounded-full
                         hover:bg-red-50 opacity-0 group-hover:opacity-100 transform hover:scale-110 active:scale-95"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-in {
          0% {
            transform: translateX(-100%);
            opacity: 0;
          }
          100% {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes delete {
          0% {
            transform: translateX(0) scale(1);
            opacity: 1;
          }
          30% {
            transform: translateX(30px) scale(1.02);
            opacity: 0.7;
          }
          100% {
            transform: translateX(-100%) scale(0);
            opacity: 0;
          }
        }

        .animate-slide-in {
          animation: slide-in 0.5s ease-out forwards;
        }

        .animate-delete {
          animation: delete 0.5s ease-in-out forwards;
        }
      `}</style>
    </div>
  );
};

export default App;
