interface Iprops {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  handleAdd: (e: React.FormEvent) => void;
}

const InputField: React.FC<Iprops> = ({ todo, setTodo, handleAdd }) => {
  return (
    <form 
    onSubmit={(e) => handleAdd(e)}
    className="flex mt-3 bg-slate-800 w-full px-2 rounded-full justify-between">
      <input
        value={todo}
        onChange={(e)=> setTodo(e.target.value)}
        type="text"
        name="newTask"
        placeholder="Learn Typescript"
        className="w-full pr-1 mr-2 rounded-xl bg-transparent focus:outline-none h-8 pl-2 text-sm z-10"
      />
      <button type="submit" className="px-2 border-l text-sm">
        Add
      </button>
    </form>
  );
};

export default InputField;
