let bo = {
    fn: {}
};

bo.fn.setCookie = function (cname, cvalue, exdays) {
    let d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/" + ";" + "domain=" + bo.fn.domainSearch(document.location.hostname) + ";";
};

bo.fn.getCookie = function (cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');

    for (var i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
};

bo.fn.setUTM = function () {
    const cname = "utm_cookies";
    let utm = JSON.parse(decodeURIComponent(bo.fn.getCookie(cname) || "%7B%7D"));
    let i, u, p, b = /^utm/;
    let us = location.search.replace(/&amp;/g, '&').split(/[?&]/);
    for (i in us) {
        u = decodeURIComponent(us[i]);
        if (!u || !b.test(u)) continue;
        p = u.split(/=/);
        utm[p[0]] = p[1];
    }
    bo.fn.setCookie(cname, encodeURIComponent(JSON.stringify(utm)), 31);
};


bo.fn.domainSearch = function (domainAsString) {
    let d = domainAsString.split('.');
    
    if (1 == d.length) { // localhost or local
        return d[0];
    } else if (2 == d.length) {
        return d[0] + '.' + d[1];
    } else if (2 < d.length) {
        return d[d.length - 2] + '.' + d[d.length - 1];
    } else {
        // for unexpectable situation
        return 'localhost';
    }
}
