const baseUrl = "";
var failedLogRequests1 = [];
var failedLogRequests2 = [];
var failedLogRequests3 = [];
var failedLogRequests4 = [];
var hideControls = false;

window.onload = function () {
    var queryString = window.location.search;
    var queryObject = new Object();
    var useSignalingKey = false;
    var signalingKey = "";
    if (queryString) {
        queryString = queryString.substring(1);
        var parameters = queryString.split('&');
        var view = 0;
        var videoCodec = "";
        for (var i = 0; i < parameters.length; i++) {
            var element = parameters[i].split('=');
            var paramName = decodeURIComponent(element[0]);
            var paramValue = decodeURIComponent(element[1]);
            if (paramName == "videoCodec") {
                videoCodec = "&videoCodec=" + paramValue;
            }
            else if (paramName == "signalingKey") {
                useSignalingKey = true;
                signalingKey = paramValue;
            } else if (paramName == "hideControls") {
                if(paramValue.toLowerCase() == "true"){
                    hideControls = true;
                }else{
                    hideControls = false
                }
            }
            else {
                view++;
                //queryObject[paramName] = "./recvonly.html?roomId=" + paramValue;
                queryObject[paramName] = "./dcrop/dcrop.html?roomId=" + paramValue;
                var iframe = document.createElement("iframe");
                iframe.id = paramName;
                iframe.className = "cameraIFrame";
                document.getElementById("container").appendChild(iframe);
            }
        }

        var width = "98%";
        var height = "96%";
        switch (view) {
            case 1:
                break;
            case 2:
                width = "49%";
                break;
            case 3:
            case 4:
                width = "49%";
                height = "48%";
                break;
        }

        var elements = document.querySelectorAll('iframe');
        for (var i = 0; i < elements.length; i++) {
            if (useSignalingKey) {
                elements[i].src = queryObject[elements[i].id] + videoCodec + `&signalingKey=${signalingKey}`;
            } else {
                elements[i].src = queryObject[elements[i].id] + videoCodec;
            }
            elements[i].style.margin = "2px";
            elements[i].style.border = "0px";
            elements[i].style.width = width;
            elements[i].style.height = height;
        }
    }
}

function getUrlParameters() {
    var search = location.search.substring(1);
    return JSON.parse('{"' + search.replace(/&/g, '","').replace(/=/g, '":"') + '"}', function (key, value) { return key === "" ? value : decodeURIComponent(value) })
}