export default function getCookie (name) {
    let cookieStr = document.cookie;
    if (cookieStr.length == 0) return;
    let arr;
    let res = null;
    if (cookieStr.indexOf(';') !== -1) {
        arr = cookieStr.split('; ');
        arr.forEach((cookie,index) => {
            let temp = cookie.split('=');
            if (temp[0] == name) {
                res = temp[1];
            }
        })
    } else {
        let temp = cookieStr.split('=');
        if (temp[0] == name) {
            res = temp[1];
        }
    }
    return res;
}