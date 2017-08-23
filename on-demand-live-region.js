/* global define */

(function (global) {
  'use strict'

  // Constructor
  function OnDemandLiveRegion (options) {
    options = options || {}

    // The default settings for the module.
    this.settings = {
      level: 'polite',
      parent: 'body',
      idPrefix: 'live-region-',
      delay: 0
    }

    // Overwrite defaults where they are provided in options
    for (var setting in options) {
      if (options.hasOwnProperty(setting)) {
        this.settings[setting] = options[setting]
      }
    }

    // Cast parent as DOM node
    this.settings.parent = document.querySelector(this.settings.parent)
  }

  // 'Say' method
  OnDemandLiveRegion.prototype.say = function (thingToSay, delay) {
    // Get rid of old live region if it exists
    var oldRegion = this.settings.parent.querySelector('[id^="' + this.settings.idPrefix + '"]') || false
    if (oldRegion) {
      this.settings.parent.removeChild(oldRegion)
    }

    // Did an override level get set?
    delay = delay || this.settings.delay

    // Create fresh live region
    this.currentRegion = document.createElement('span')
    this.currentRegion.id = this.settings.idPrefix + Math.floor(Math.random() * 10000)

    // Determine redundant role
    var role = this.settings.level !== 'assertive' ? 'status' : 'alert'

    // Add role and aria-live attribution
    this.currentRegion.setAttribute('aria-live', this.settings.level)
    this.currentRegion.setAttribute('role', role)

    // Hide live region element, but not from assistive technologies
    this.currentRegion.setAttribute('style', 'clip: rect(1px, 1px, 1px, 1px); height: 1px; overflow: hidden; position: absolute; white-space: nowrap; width: 1px')

    // Add live region to its designated parent
    this.settings.parent.appendChild(this.currentRegion)

    // Populate live region to trigger it
    window.setTimeout(function () {
      this.currentRegion.textContent = thingToSay
    }.bind(this), delay)

    return this
  }

  // Export OnDemandLiveRegion
  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = OnDemandLiveRegion
  } else if (typeof define === 'function' && define.amd) {
    define('OnDemandLiveRegion', [], function () {
      return OnDemandLiveRegion
    })
  } else if (typeof global === 'object') {
    // attach to window
    global.OnDemandLiveRegion = OnDemandLiveRegion
  }
}(this))
