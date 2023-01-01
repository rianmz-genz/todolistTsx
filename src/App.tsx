import { useState, useEffect } from "react";
import InputField from "./components/InputField";
import React from "react";
import TaskList from "./components/TaskList";
import { type } from "@testing-library/user-event/dist/type";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

interface Todo {
  id: number;
  todo: string;
  isDone: boolean;
}

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);
  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (todo) {
      setTodos([
        ...todos,
        {
          id: Date.now(),
          todo,
          isDone: false,
        },
      ]);
    }
    setTodo("");
  };
  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;
      let add,
          active = todos,
          complete = completedTodos;
      if(source.droppableId === 'Tasklist'){
        add = active[source.index];
        active.splice(source.index, 1);
      }else{
        add = complete[source.index];
        complete.splice(source.index, 1);
      }
      if(destination.droppableId === 'Tasklist'){
        active.splice(destination.index, 0, add);
      }else{
        complete.splice(destination.index, 0, add);
      }
      setTodos(active)
      setCompletedTodos(complete)
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <main className="w-full h-screen bg-slate-900 text-white flex justify-center">
        <div className="max-w-[600px] mt-5 flex items-center flex-col">
          <h1 className="text-xl">Tasks</h1>
          <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
          {todos.length === 0 ? (
            <p className="text-sm mt-2">No one task in here 🙂</p>
          ) : (
            <TaskList
              completedTodos={completedTodos}
              setCompletedTodos={setCompletedTodos}
              todos={todos}
              setTodos={setTodos}
            />
          )}
        </div>
      </main>
    </DragDropContext>
  );
};

export default App;
