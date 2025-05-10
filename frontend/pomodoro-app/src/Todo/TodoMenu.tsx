// // 투두 햄버거 메뉴
// import React from 'react'

// import style from '../css/Todo/Todo.module.scss';
// import { Todo, TodoListProps } from '../types/todo';



// function TodoMenu() {
  
//   // 햄버거 메뉴 버튼 
//   const MenuIcon = () => {
//     return (
//       <>
//         <span></span>
//         <span></span>
//         <span></span>
//       </>
//     );
//   }

//   return (
//     <div
//     ref={(el) => { menu.ref.current[todo.id] = el; }}
//     className={style.menuWrapper}
// >
//     <div className={style.menu}
//         onClick={(e) => {
//             e.stopPropagation();
//             menu.toggle(todo.id);
//         }}
//         tabIndex={0}
//         role="button">
//         <MenuIcon></MenuIcon>
//     </div>
//     {menu.isOpen === true &&
//         <div className={style.menuPopup}>
//             <ul>
//                 <li><button onClick={() => { edit.onStartEdit(todo.id); menu.toggle(todo.id) }}>수정</button></li>
//                 <li><button onClick={() => { onDelete(todo.id); menu.toggle(todo.id); }}>삭제</button></li>
//             </ul>
//         </div>
//     }
// </div>
//   )
// }

// export default TodoMenu
