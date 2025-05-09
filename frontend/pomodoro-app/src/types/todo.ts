export interface Todo {
    id: number;
    todo: string;
    completed: boolean;
  }
  
  export interface TodoListProps {
    todoList: Todo[];
    setTodoList: React.Dispatch<React.SetStateAction<Todo[]>>;
    onDeleteClick: (id: number) => void;
  }