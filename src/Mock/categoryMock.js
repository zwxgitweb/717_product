const Mock = require('mockjs');
const fs = require('fs');

let data = Mock.mock({
    "list|8":[
        {
            'info': () => Mock.mock('@csentence(3, 5)'),
            'src': () => Mock.mock('@color()')
        }
    ]
})

fs.writeFileSync('../../server/categoryList.json', JSON.stringify(data));