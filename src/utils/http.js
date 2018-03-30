// 请求处理接口

let $http = {
    get (url, data) {
        if (Object.prototype.toString.call(data) != '[object Object]') {
            return {
                then(callback) {
                    callback('get方式请求入参格式不正确,需传入OBJECT');
                    return {
                        catch(err) {
                            err(new Error('入参格式不正确'));
                        }
                    }
                }
            }
        }
        let queryString = '?';
        for (let i in data) {
            queryString += i + '=' + data[i] + '&';
        }
        url = encodeURI(url + queryString.slice(0, -1));
        return fetch('http://localhost:9000' + url, {
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        })
        .then(res => res.json());
    },
    post (url, data) {
        if (Object.prototype.toString.call(data) != '[object Object]') {
            return {
                then(callback) {
                    callback('get方式请求入参格式不正确,需传入OBJECT');
                    return {
                        catch(err) {
                            err(new Error('入参格式不正确'));
                        }
                    }
                }
            }
        }
        return fetch('http://localhost:9000' + url, {
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            method: 'POST'
        }).then(res => res.json());
    },
    jsonp (url) {
        return new Promise ((resolve, reject) => {
            let script = document.createElement('script');
            let body = document.body;
            script.src = url;
            body.appendChild(script);
        })
    }
}

export default $http;