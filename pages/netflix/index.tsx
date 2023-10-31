import dynamic from 'next/dynamic';

const NetFlixComponent = dynamic<any>(
  () => import('component/netflix/NetFlixComponent'),
  {
    ssr: false,
  },
);

const NetFlix = () => {
  return <NetFlixComponent />;
};

export default NetFlix;
