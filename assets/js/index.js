
function showSubmenu(id) {

    var menus = document.getElementsByClassName("root-menu");    

    var currentMenu = id == '' ? menus[0] : document.getElementById('side-nav-' + id);    
    while(!currentMenu.classList.contains('root-menu')) {
        currentMenu = currentMenu.parentElement;
    }

    currentMenu.parentNode.parentNode.classList.add('open');

    for (var i=0; i < menus.length; i++) {
        if(menus[i] !== currentMenu) {
            menus[i].style.display = 'none';
            menus[i].parentNode.classList.remove('open');
        }
    }
}

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