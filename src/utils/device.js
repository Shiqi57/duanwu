import Sniffer from 'snifferjs';
import BotDetector from 'device-detector-js/dist/parsers/bot';

const userAgent = typeof window !== 'undefined' ? window.navigator.userAgent : '';

const sniffer = Sniffer(userAgent);
const botDetector = new BotDetector();
const botDetected = botDetector.parse(userAgent);

const device = {
  info      : sniffer,
  bot       : botDetected,
  detection : {
    isDesktop    : !sniffer.features.mobile,
    isMobile     : sniffer.features.mobile, // Tablets and Phones
    isiOS        : sniffer.os.name === 'ios',
    isFirefox    : sniffer.browser.name === 'firefox',
    isSafari     : sniffer.browser.name === 'safari',
    isAndroid    : sniffer.os.name === 'android',
    isEdge       : sniffer.browser.name === 'edge',
    isChromeEdge :
      sniffer.browser.name === 'edge' && sniffer.browser.engine !== 'edgehtml',
    isIE           : sniffer.browser.name === 'ie',
    isChrome       : sniffer.browser.name === 'chrome',
    browserVersion : sniffer.browser.majorVersion,
    osVersion      : sniffer.os.majorVersion,
    osFullVersion  : sniffer.os.version,
    os             : sniffer.os.fullName,
    isMac          : sniffer.os.fullName === 'macOS',
    isWindows      : sniffer.os.fullName === 'win',
    isiPadOS       :
      userAgent.match(/Mac/) &&
      navigator.maxTouchPoints &&
      navigator.maxTouchPoints > 2,
    isWebviewiOS :
      /((iPhone|iPod|iPad).*AppleWebKit(?!.*Version)(?!.*CriOS)|; wv)/i.test(
        userAgent
      ),
    isChromeiOS        : /((iPhone|iPod|iPad).*AppleWebKit.*CriOS)/i.test(userAgent),
    isSamsungBrowser   : /.*SamsungBrowser.*/.test(userAgent),
    isFacebookBrowser  : /.*FBAN.*/.test(userAgent) || /.*FBAV.*/.test(userAgent),
    isInstagramBrowser : /.*Instagram.*/.test(userAgent),
  }
};

export const info = device.info;
export const bot = device.botDetected;
export const detection = device.detection;

export default device;
