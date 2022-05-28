import PageHead from '@/components/PageHead/PageHead.jsx';
import Landing from '@/components/Landing/Landing.jsx';
import Canvas from '@/components/Canvas/Canvas.jsx';
import styled from './index.module.scss';

export default function Home() {
  return (
    <div className={styled.Home}>
      <PageHead
        title="A Website"
        description="This is a website"
      />
      <Canvas />
      <Landing />
    </div>
  );
}
