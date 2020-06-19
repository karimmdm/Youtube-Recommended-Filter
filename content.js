window.onload = function(){
    var url = window.location.href;
    if(url.indexOf("watch?v=") != -1){
        console.log("removing...");
        filterType1();
    }
}
/*will think about implememting for main page at a later time*/

/*Filters the video on the next up pannel when watching a specific video*/
function filterType1(){
    var dict = new Map();
    getChannelsOnScreen(dict);
    deleteVideos(dict);

    $(window).bind('mousewheel', function(event) {
        if (event.originalEvent.wheelDelta < 0) {
            // scrolling down
            // update the map
            getChannelsOnScreen(dict);
            //delete the video elements
            deleteVideos(dict);
        }
    });
}

/*returns the channel's video (element object) showing up on screen*/
function getChannelsOnScreen(dict){
    let related = $("#related");
    let items = $("#related #items");
    let recommendations = [];

    recommendations = items.children();

    for(elt of recommendations){
        let name = $(elt).find("yt-formatted-string").text();
        // add name of channel and {elt} to map if its not already in there
        if(dict.has($.data(elt)) == false){
            $(elt).data("theObj", elt);
            dict.set($.data(elt), name);
        }
    }
}

/*returns the list of blacklisted channels*/
function deleteVideos(dict){
    chrome.storage.local.get('channels', function(result){
        var channels = result.channels;
        //get the elements to delete
        if(channels.length != 0){
            for(c of channels){
                toDelete = getKeys(dict, c);
                for(elt of toDelete){
                    $(elt["theObj"]).remove();
                }
            }
        }
    });
}

function getKeys(map, searchValue) {
    let res = []
    for (let [key, value] of map) {
        if (value == searchValue){
            res.push(key);
        }
    }
    return res;
}
