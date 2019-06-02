function analytics() {
    var host = document.location.host
    if (host.startsWith("localhost") || host.startsWith("127")) {
        console.log("Omitted sending analytics event when running on localhost");
        return;
    }

    var request = {
        host: document.location.host,
        ctx: window.location.pathname,
        url: window.location.href
    };

    $.ajax({
        type: "POST",
        url: "https://hits.devsoap.com/hit",
        contentType: "application/json",
        data: JSON.stringify(request),
        crossDomain: true,
    });
}

function sponsorshipScroll() {
    var elem = document.getElementById("sponsorship");
    var height = document.getElementsByTagName("header")[0].offsetHeight;
    if(window.scrollY >= height) {
        elem.style.position = 'fixed';
    } else {
        elem.style.position = 'static';
    }
}

window.onscroll = function() {
    sponsorshipScroll();
};