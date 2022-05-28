import { Html, Head, Main, NextScript } from 'next/document';

const customFonts = `
  /*
   * ****************************
   * League Spartan font face
   */

  @font-face {
    font-family: 'League Spartan';
    src:  url('/fonts/LeagueSpartan/LeagueSpartan-Regular.woff2') format('woff2'),
          url('/fonts/LeagueSpartan/LeagueSpartan-Regular.woff') format('woff');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'League Spartan';
    src:  url('/fonts/LeagueSpartan/LeagueSpartan-SemiBold.woff2') format('woff2'),
          url('/fonts/LeagueSpartan/LeagueSpartan-SemiBold.woff') format('woff');
    font-weight: 600;
    font-style: normal;
    font-display: swap;
  }
`;

export default function Document() {
  return (
    <Html>
      <Head />
      <style dangerouslySetInnerHTML={{ __html : customFonts }} />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
