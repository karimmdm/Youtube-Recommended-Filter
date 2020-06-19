window.onload = function(){
    document.getElementById("blacklist_btn").onclick = blacklist;
    document.getElementById("whitelist_btn").onclick = whitelist;
    document.getElementById("clear_btn").onclick = clear;
    document.getElementById("showAll_btn").onclick = showAll;

    /*function that adds text in textbox to blacklist if blacklist_btn is
    clicked*/
    function blacklist(){
        let cname = document.getElementById("cname").value;
        chrome.storage.local.get({channels: []}, function(result){
            var channels = result.channels;
            let index = channels.indexOf(cname);
            if(index == -1){
                channels.push(cname);
            }
            setChannels(channels);
        });
        document.getElementById("cname").value = ""
    }

    /*function that removes text in textbox from blacklist if whitelist_btn is
    clicked*/
    function whitelist(){
        let cname = document.getElementById("cname").value;
        chrome.storage.local.get({channels: []}, function(result){
            var channels = result.channels;
            let index = channels.indexOf(cname);
            if(index != -1){
                channels.splice(index, 1);
            }
            setChannels(channels)
        });
        document.getElementById("cname").value = ""
    }

    /*clears the blacklist*/
    function clear(){
        chrome.storage.local.get({channels: []}, function(result){
            var channels = result.channels;
            channels.length=0;
            setChannels(channels);
        });
    }

    /*helper method to update the chrome storage*/
    function setChannels(channels){
        chrome.storage.local.set({channels: channels}, function(result){
            // chrome.storage.local.get('channels', function(result){
            //     console.log(result.channels);
            // });
        });
    }

    function showAll(){
        chrome.storage.local.get('channels', function(result){
            // console.log(result.channels);
            if(result.channels == null || (result.channels).length != 0){
                window.alert("Blacklisted Channels: none");
            }else{

                window.alert("Blacklisted Channels: " + result.channels);
            }
        });
    }
}
