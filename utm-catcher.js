let lp = {
    fn: {}
};

lp.fn.setCookie = function (cname, cvalue, exdays) {
    let d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/" + ";" + "domain=" + domainSearch(document.location.hostname) + ";";
};

lp.fn.getCookie = function (cname) {
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

lp.fn.setUTM = function () {
    const cname = "utm_cookies";
    let utm = JSON.parse(decodeURIComponent(lp.fn.getCookie(cname) || "%7B%7D"));
    let i, u, p, b = /^utm/;
    let us = location.search.replace(/&amp;/g, '&').split(/[?&]/);
    for (i in us) {
        u = decodeURIComponent(us[i]);
        if (!u || !b.test(u)) continue;
        p = u.split(/=/);
        utm[p[0]] = p[1];
    }
    lp.fn.setCookie(cname, encodeURIComponent(JSON.stringify(utm)), 31);
};
