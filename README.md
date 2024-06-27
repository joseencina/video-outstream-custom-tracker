# Video Out-Stream Custom Tracker for Equativ
This custom logic is designed to trigger custom tracking pixels during various events when utilizing Video Out-Stream templates at Equativ.


> [!IMPORTANT]
> This document assumes that the user who performs this integration has access to [Equativ's services](https://equativ.com/).

## Description

The logic primarily focuses on capturing the `Start` and `Complete` events triggered by the video player during the playback of video ad content.

These events are considered to activate the custom tracking pixels specified in the `TRACKING_URLS` object. Follow [Integration Details](#integration-details) below. 

### Integration Details

#### Integration at Insertion Level

This code is intended to be included in Equativ's insertion configuration. It should be integrated into the Custom Script parameter using `<script>` HTML tags.

Example of integration:
```html
<script>
    /* custom_tracker.js code here */
</script> 
```

### Tracking URLs Configuration

To deliver the required tracking pixels, the URL or URLs should be inserted as values for the "START" and/or "COMPLETE" statuses as applicable.

For example, considering the original code:
```javascript
const TRACKING_URLS = {
    "START": "TRACKING_URL",
    "COMPLETE": "TRACKING_URL"
}
```
Here is the code when integrating both tracking URLs:
```javascript
const TRACKING_URLS = {
    "START": "https://tacker.trackerprovider.com/pixel_start",
    "COMPLETE": "https://tacker.trackerprovider.com/pixel_complete"
}
```

### Debug Options

The code includes console logs corresponding to various stages of the logic execution. These logs can be activated by setting the parameter `CUSTOM_TRACKER.res.debug` to `true`.

```javascript
/* Extract from the code */
CUSTOM_TRACKER = {
    (...),
    res: {
        (...),
        debug: false
    }
}
```

### Player Detection

The code is executed upon detection of the `adBegin` event, which is officially supported by Equativ ([documentation link](https://help.smartadserver.com/s/article/Smart-Video-Read#:~:text=in%20the%20console.-,Event%20listening,-The%20In%2Dread)). This event is essential for detecting the presence of the video player.


## Minified Code Version
This repository provides a _**minified version**_ of the code (`custom_tracker.min.js`) to enhance user experience.\
This is provide in order to save screen space as the _Custom Script_ parameter may occupy too much when interacting with the insertion configuration.
