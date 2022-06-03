import PropTypes from 'prop-types';
import Head from 'next/head';

const propTypes = {
  title       : PropTypes.string,
  description : PropTypes.string,
  keywords    : PropTypes.array,
  twitter     : PropTypes.shape({
    title       : PropTypes.string,
    description : PropTypes.string
  })
};

const defaultProps = {
  title       : '',
  description : '',
  keywords    : [],
  twitter     : {
    title       : 'Twitter Share: Title',
    description : 'Twitter Share: Description'
  }
};

const PageHead = (props) => {
  const { title, description, keywords, twitter } = props;

  return (
    <Head>
      <title>{ title }</title>
      <meta
        name="description"
        content={description}
      />
      <meta
        name="keywords"
        content={keywords.join(',')}
      />

      {/*
        -- Generate favicons here: https://realfavicongenerator.net/ --
        -- and follow the instructions to replace the favicons below --
      */}
      <link rel="apple-touch-icon" sizes="180x180"
        href="/favicons/apple-touch-icon.png"
      />
      <link rel="icon" href="/favicons/favicon.svg" />
      <link
        rel="icon" type="image/png"
        sizes="32x32" href="/favicons/favicon-32x32.png"
      />
      <link
        rel="icon" type="image/png"
        sizes="16x16" href="/favicons/favicon-16x16.png"
      />
      <link rel="manifest" href="/favicons/site.webmanifest" />
      <link
        rel="mask-icon"
        href="/favicons/safari-pinned-tab.svg"
        color="#000000"
      />
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta name="theme-color" content="#ffffff" />

      {/*
        -- Social sharing meta tags --
        -- Source: https://css-tricks.com/essential-meta-tags-social-media/ --
      */}
      <meta property="og:title" content="A Website" />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="/images/share-fb.jpg" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:url" content="#" />
      <meta property="og:description" content="A Website" />
      <meta property="og:site_name" content="A Website" />

      {/* Twitter */}
      <meta property="twitter:title" content={twitter.title} />
      <meta property="twitter:description" content={twitter.description} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content="/images/share-tw.jpg" />
      <meta name="twitter:image:alt" content="alt text for image" />

      {/* Non-Essential, But Required for Analytics */}
      <meta property="fb:app_id" content="your_app_id" />
      <meta name="twitter:site" content="@website-username" />
    </Head>
  );
};

PageHead.propTypes = propTypes;
PageHead.defaultProps = defaultProps;

export default PageHead;
