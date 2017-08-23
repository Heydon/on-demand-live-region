# On Demand Live Regions

A tiny module for making screen readers announce text on demand, without a visual change to the interface. Initializing and using the live region is as simple as:

```js
const liveRegion = new OnDemandLiveRegion()

liveRegion.say('Hello World!')
```

## Installation

Just grab the [minified version](on-demand-live-region.min.js) or install from NPM:

```
npm i on-demand-live-region
```

## Settings object

* `level` — the live region level (default: `polite`)
* `parent` — the element to which the live region will be append (default: `body`)
* `idPrefix` — the prefix for the unique `id` generated for the live region (default: `live-region-`)
* `delay` — the delay in milliseconds before the phrase is announced (default: `0`)

## Assertive example with a half second delay

```js
const liveRegionDelayed = new OnDemandLiveRegion({
  level: 'assertive',
  delay: 500
})

liveRegionDelayed.say('Hello World! (sorry, delayed reaction)')
```

You can override the delay setting in a second argument when calling `say`:

```js
liveRegionDelayed.say('Hello World! (sorry, delayed reaction)', 1000)
```

## Say it over and over

Each time you use the `say` method, the extant live region (if it exists) is destroyed and a new one created. This means you can reliably make the same announcement multiple times. This is not guaranteed in other implementations, where a persistent live region is repopulated.

## Tested in

* Safari with VoiceOver
* Chrome with VoiceOver
* IE11 with JAWS
* Chrome with JAWS
* Firefox with NVDA
* Chrome with ChromeVox
