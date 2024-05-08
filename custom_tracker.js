/**
 * TRACKING_URLS Information
 * Please, add the specific tracking URLs
*/
const TRACKING_URLS = {
    "START": "TRACKING_URL", //Replace "TRACKING_URL" value
    "COMPLETE": "TRACKING_URL" //Replace "TRACKING_URL" value
}

/**
 * CUSTOM_TRACKER Logic
 * //BY DEFAULT, DO NOT MODIFY\\
*/
// Method for triggering pixels
let CUSTOM_TRACKER = {
    init: function(TRACKING_URLS) {
        CUSTOM_TRACKER.log("init");
        CUSTOM_TRACKER.TRACKING_URLS = TRACKING_URLS;
        // Trigger Start Custom tracking
        CUSTOM_TRACKER.trigger(CUSTOM_TRACKER.TRACKING_URLS["START"],"start");
    },
    trigger: function(url,type) {
        let tracker = new Image();
        tracker.setAttribute('src',url);
        CUSTOM_TRACKER.log(type);
    },
    complete: function(player) {
        // Trigger Complete Custom tracking if it was not triggered already
        if(!CUSTOM_TRACKER.res.completeCheck){
            CUSTOM_TRACKER.res.completeCheck = true;
            CUSTOM_TRACKER.trigger(CUSTOM_TRACKER.TRACKING_URLS["COMPLETE"],"complete");
        }
    },
    log: function(msg) {
        if(CUSTOM_TRACKER.res.debug) {
            console.log('%c CUSTOM_TRACKER ','background: #F2777A; color: #F7F7F6; border-radius: 3px;',msg);
        }
    },
    res: {
        completeCheck: false,
        debug: false
    }
}
// Listen adBegin event to be sure video player is present
window.top.addEventListener('adBegin', function (e) {
    CUSTOM_TRACKER.log("adbegin");
    CUSTOM_TRACKER.init(TRACKING_URLS);
    // Get video player element
    const player = window.top.newObj[sas_insertionId].videoDiv.getElementsByTagName('video')[0];
    // Set listener for checking current time
    player.addEventListener('timeupdate' , function() {
        if(player.duration - player.currentTime < 0.5) {
            CUSTOM_TRACKER.complete(player);
        }            
    });
});
