import ToDoListClassImportComponent from 'component/toDoList/ToDoListClassImportComponent';
import dynamic from 'next/dynamic';

// const ToDoListClassImportComponent = dynamic<any>(
//   () => import('component/toDoList/ToDoListClassImportComponent'),
//   {
//     ssr: false,
//   },
// );

const ToDoList = () => {
  return <ToDoListClassImportComponent />;
};

export default ToDoList;
