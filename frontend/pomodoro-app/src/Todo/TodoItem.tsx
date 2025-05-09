import style from '../css/Todo/Todo.module.scss';
import { Todo, TodoListProps } from '../types/todo';

interface TodoItemProps {
    todo: Todo;
    menu: {
      ref: React.MutableRefObject<{ [key: number]: HTMLDivElement | null }>;
      isOpen: boolean;
      toggle: (id: number) => void;
    };
    edit: {
      isEditing: boolean;
      text: string;
      onChange: (text: string) => void;
      onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>, id: number) => void;
      onStartEdit: (id: number) => void;
    };
    onDelete: (id: number) => void;
  }
  
function TodoItem({ todo, menu, edit, onDelete }: TodoItemProps) {
    // 햄버거 메뉴 버튼 
    const MenuIcon = () => {
        return (
            <>
                <span></span>
                <span></span>
                <span></span>
            </>
        );
    }

    return (
        <li key={`todo${todo.id}`} className={style.todoLi}>
            <input type="checkbox"
                id={`todo-${todo.id}`}
                className={style.screenReader} />
            {edit.isEditing === true ?
                <div className={style.labelBox}>
                    <span className={style.checkIcon} aria-hidden="true"></span>
                    <input type="text"
                        onChange={(e) => edit.onChange(e.target.value)}
                        value={edit.text}
                        onKeyDown={(e) => edit.onKeyDown(e, todo.id)}></input>
                </div> :
                <div className={style.labelBox}>
                    <span className={style.checkIcon} aria-hidden="true"></span>
                    <label htmlFor={`todo-${todo.id}`}>{todo.todo}</label>
                </div>
            }
            <div
                ref={(el) => { menu.ref.current[todo.id] = el; }}
                className={style.menuWrapper}
            >
                <div className={style.menu}
                    onClick={(e) => {
                        e.stopPropagation();
                        menu.toggle(todo.id);
                    }}
                    tabIndex={0}
                    role="button">
                    <MenuIcon></MenuIcon>
                </div>
                {menu.isOpen === true &&
                    <div className={style.menuPopup}>
                        <ul>
                            <li><button onClick={() => { edit.onStartEdit(todo.id); menu.toggle(todo.id) }}>수정</button></li>
                            <li><button onClick={() => { onDelete(todo.id); menu.toggle(todo.id); }}>삭제</button></li>
                        </ul>
                    </div>
                }
            </div>
        </li>
    );
}

export default TodoItem;