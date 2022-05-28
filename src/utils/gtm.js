/**
 * @export
 * @module
 * @class GTM.
 * @classdesc This is a helper class for use with Google Tag Manager
 *
 * For more information about Google Analytics, please check out:
 * https://www.notion.so/reflektordigital/Google-Analytics-fc03ad2781be4b45a810f5f5b1dc9fa0
 */

class GTM {
  /**
   * @description Push an event to the data layer for tracking
   * @param {String} eventName - Name of the event (eg. 'game_completed').
   * @param {Object} eventProps - Properties to be added to the data layer.
   * @return {undefined}
   */
  push(eventName, eventProps = {}) {
    if (window.dataLayer) {
      window.dataLayer.push({
        event : eventName,
        ...eventProps,
      });
    }
  }
}

export default new GTM();
