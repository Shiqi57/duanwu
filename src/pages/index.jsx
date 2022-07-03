import PageHead from '@/components/PageHead/PageHead.jsx';
import Landing from '@/components/Landing/Landing.jsx';
import ThreeCanvas from '@/components/Canvas/Canvas.jsx';
import styled from './index.module.scss';

export default function Home() {
  return (
    <div className={styled.Home}>
      <PageHead
        title="Trevi Fountain"
        description="This is a Trevi Fountain"
      />
      <ThreeCanvas />
      <Landing />
    </div>
  );
}
