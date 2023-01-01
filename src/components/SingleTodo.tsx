import React, { useEffect, useState, useRef } from "react";
import { Draggable } from "react-beautiful-dnd";
import { FiEdit2 } from "react-icons/fi";
import { MdDeleteOutline, MdDone } from "react-icons/md";

interface Todo {
  id: number;
  todo: string;
  isDone: boolean;
}

type Props = {
  index: number;
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

const SingleTodo: React.FC<Props> = ({ index, todo, todos, setTodos }) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);
  const inputRef = useRef<HTMLInputElement>(null);
  const handleDone = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };
  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };
  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    editTodo == ""
      ? handleDelete(id)
      : setTodos(
          todos.map((todo) =>
            todo.id === id ? { ...todo, todo: editTodo } : todo
          )
        );
    setEdit(false);
  };
  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);
  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided) => (
        <form
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          onSubmit={(e) => handleEdit(e, todo.id)}
          className="hover:cursor-grab flex w-full justify-between mt-2 max-w-[300px] h-fit bg-slate-800 px-3 py-1 rounded-full"
        >
          {edit ? (
            <input
              ref={inputRef}
              className="bg-slate-800 w-full px-2 rounded-full justify-between"
              type="text"
              value={editTodo}
              onChange={(e) => setEditTodo(e.target.value)}
            />
          ) : todo.isDone ? (
            <s className="opacity-60">{todo.todo}</s>
          ) : (
            <span title={todo.todo} className="max-w-[200px] truncate">
              {todo.todo}
            </span>
          )}
          <div className="flex items-center gap-1 ml-2">
            <span
              className="cursor-pointer"
              onClick={() => {
                if (!edit && !todo.isDone) {
                  setEdit(!edit);
                }
              }}
            >
              <FiEdit2 />
            </span>
            <span
              className="cursor-pointer"
              onClick={() => handleDelete(todo.id)}
            >
              <MdDeleteOutline />
            </span>
            <span
              className="cursor-pointer"
              onClick={() => handleDone(todo.id)}
            >
              <MdDone />
            </span>
          </div>
        </form>
      )}
    </Draggable>
  );
};

export default SingleTodo;
