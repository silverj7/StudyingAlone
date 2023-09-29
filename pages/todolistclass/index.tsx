import dynamic from 'next/dynamic';

const ToDoListClassComponent = dynamic<any>(
  () => import('component/toDoListClass/ToDoListClassComponent'),
  {
    ssr: false,
  },
);

const ToDoList = () => {
  return <ToDoListClassComponent />;
};

export default ToDoList;
