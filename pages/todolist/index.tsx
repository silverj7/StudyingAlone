import dynamic from 'next/dynamic';

const ToDoListComponent = dynamic<any>(
  () => import('component/toDoList/ToDoListComponent'),
  {
    ssr: false,
  },
);

const ToDoList = () => {
  return <ToDoListComponent />;
};

export default ToDoList;
