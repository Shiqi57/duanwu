import Url from 'url-parse';

let url = null;

if (typeof window !== undefined) {
  url = new Url(window.location.href, true);
}

export default url;
