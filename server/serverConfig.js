const fs = require('fs');
const http = require('http');
const jwt = require('jsonwebtoken');
module.exports = function (app) {

    // 用户注册接口
    app.post('/user/register', function (req, res) {
        let registerInfo = {
            code: 0,
            success: 'register failed!'
        }
        let user = fs.readFileSync('./user.json');
        user = JSON.parse(user);
        let username = [];
        user.forEach(function (item) {
            username.push(item.username);
        })
        if (username.indexOf(req.body.username) == -1) {
            registerInfo = {
                code: 1,
                success: 'register success'
            }
            user.push(req.body);
            fs.writeFileSync('./user.json', JSON.stringify(user));
        }
        res.end(JSON.stringify(registerInfo));
    })

    // 用户登录接口
    app.post('/user/login', function (req, res) {
        let loginInfo = {
            code: 0,
            success: 'login failed!',
            token: ''
        }
        let login = req.body;
        let data = JSON.parse(fs.readFileSync('./user.json', {
            encode: 'utf8'
        }));
        data.forEach(function (user) {
            if (user.username == req.body.username && user.password == req.body.password) {
                loginInfo = {
                    code: 1,
                    success: 'login success',
                    token: jwt.sign(login, 'zwx', {
                        expiresIn: 60 * 60 * 60
                    })
                }
            }
        })
        res.end(JSON.stringify(loginInfo));
    })

    // categoryList、shopList数据接口
    app.post('/getGoodsChannel', function (req, res) {
        let data = '';
        let {
            params,
            goods_id
        } = req.body;
        data = fs.readFileSync('./' + params + '.json', {
            encode: 'utf8'
        });
        if (params == 'shopList' && goods_id <= JSON.parse(data).list.length) {
            JSON.parse(data).list.map(item => {
                if (item.goods_id == goods_id) {
                    res.end(JSON.stringify(item));
                }
            })
        } else if (params == 'showList') {
            res.end(data);
        } else {
            res.end(JSON.stringify({
                code: 0,
                success: ''
            }))
        }
    })

    // cookie解密接口|添加购物车数据接口
    app.post('/cart/getCookie', function (req, res) {
        jwt.verify(req.body.token, 'zwx', function (err, data) {
            if (err) {
                throw err;
            }
            let user_shop = JSON.parse(fs.readFileSync('./cart_shop.json', {
                encoding: 'utf8'
            }));
            let flag = true;
            if (user_shop[data.username]) {
                user_shop[data.username].map((item, index) => {
                    if (item.info == req.body.shopInfo.info) {
                        ++item.count;
                        flag = false;
                    }
                })
                flag ? user_shop[data.username].push(req.body.shopInfo) : user_shop[data.username];
            } else {
                user_shop[data.username] = [req.body.shopInfo];
            }
            fs.writeFileSync('./cart_shop.json', JSON.stringify(user_shop));
        })
        res.end('11111');
    })

    // categoryData数据接口
    app.post('/categoryData', function (req, res) {
        let data = '';
        data = fs.readFileSync('./' + req.body.data + '.json');
        JSON.parse(data).code == 1 ? res.end(data) : res.end(JSON.stringify({
            code: 0
        }));
    })

    // 购物车数据展示接口
    app.post('/cart/showCartItem', function (req, res) {
        let info = {
            code: 0,
            data: ''
        }
        jwt.verify(req.body.token, 'zwx', function (err, data) {
            if (err) {
                throw err;
            }
            let user_shop = JSON.parse(fs.readFileSync('./cart_shop.json', {
                encoding: 'utf8'
            }));
            if (user_shop[data.username]) {
                info = {
                    code: 1,
                    data: user_shop[data.username]
                }
            }
        })
        res.end(JSON.stringify(info));
    })

    // 购物车更新数量接口
    app.post('/cart/updateCartItem', function (req, res) {
        let info = {
            code: 0,
            data: ''
        }
        jwt.verify(req.body.token, 'zwx', function (err, data) {
            if (err) {
                throw err;
            }
            let cartInfo = JSON.parse(fs.readFileSync('./cart_shop.json', {
                encoding: 'utf8'
            }));
            if (req.body.cartItem instanceof Array) {
                cartInfo[data.username] = req.body.cartItem;
            } else {
                cartInfo[data.username].map(item => {
                    if (item.info == req.body.cartItem.info) {
                        item.count = req.body.cartItem.count;
                        item.select = req.body.cartItem.select;
                    }
                })
            }
            info = {
                code: 1,
                data: cartInfo[data.username]
            }
            fs.writeFileSync('./cart_shop.json', JSON.stringify(cartInfo));
        })
        res.end(JSON.stringify(info));
    })

    // 服务器端监听端口9000
    app.listen(9000, function () {
        console.log('server listen 9000');
    })
}