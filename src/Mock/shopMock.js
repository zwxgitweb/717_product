const Mock = require('mockjs');
const fs = require('fs');

let data = Mock.mock({
    "list|8":[
        {
            'goods_id': () => Mock.mock('@increment()'),
            'list|6': [
                {
                    'info': () => Mock.mock('@csentence()'),
                    'src': () => Mock.mock('@color()'),
                    'price': () => Mock.mock('@float(1, 100, 1, 2)'),
                    'count': 1,
                    'select': 0
                }
            ],
            'title': () => Mock.mock('@csentence(3, 15)')
        }
    ]
})

fs.writeFileSync('../../server/shopList.json', JSON.stringify(data));