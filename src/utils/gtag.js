/**
 * @export
 * @module
 * @class GTag.
 * @classdesc This is a helper class for tracking events and page views for Google Analytics.
 *
 * For more information about Google Analytics, please check out:
 * https://www.notion.so/reflektordigital/Google-Analytics-fc03ad2781be4b45a810f5f5b1dc9fa0
 */

class GTag {
  /**
   * @description Track a custom event
   * @param {Object} params - Function parameters object.
   * @param {String} params.event - Name of the event (eg. 'game_completed').
   * @param {String} params.payload - Payload for the event we want to send.
   * @return {undefined}
   */
  trackEvent(event, payload = {}) {
    if (window.gtag) {
      window.gtag('event', event, {
        ...payload,
      });
    }
  }

  /**
   * @description Track a page view
   * @param {String} page - The name of the page viewed
   * @return {undefined}
   */
  trackPage(page) {
    if (window.gtag) {
      window.gtag('send', 'pageview', page);
    }
  }
}

export default new GTag();
