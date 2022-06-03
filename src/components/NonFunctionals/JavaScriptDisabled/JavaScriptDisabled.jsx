import styles from './JavaScriptDisabled.styles';

const JavaScriptDisabled = () => {
  return (
    <noscript>
      <style dangerouslySetInnerHTML={{ __html : styles }} />
      JavaScript Disabled
    </noscript>
  );
};

export default JavaScriptDisabled;
