import '@/utils/wdyr';
import '@/styles/index.scss';
import useWindowResizeListener from '@/hooks/use-window-resize-listener';
import useGsapPlugins from '@/hooks/use-gsap-plugins';
import NonFunctionals from '@/components/NonFunctionals/NonFunctionals.jsx';

function App({ Component, pageProps }) {
  useWindowResizeListener();
  useGsapPlugins();

  return (
    <div className="App">
      <Component {...pageProps} />
      <NonFunctionals />
    </div>
  );
}

export default App;
