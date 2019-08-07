const developConfig = './config-develop.js';
// 可设定为绝对路径，如 /opt/product/config-override.js
const productionConfig = './config-production.js';
const testConfig = './config-test.js';

const fs = require('fs');

var config = null;

if (process.env.NODE_ENV === 'test') {
    console.log(`Load ${testConfig}...`);
    config = require(testConfig);
} else {
    console.log(`Load ${developConfig}...`);
    config = require(developConfig);
    try {
        if (fs.statSync(productionConfig).isFile()) {
            console.log(`Load ${productionConfig}...`);
            config = Object.assign(config, require(productionConfig));
        }
    } catch (err) {
        console.log(`Cannot load ${productionConfig}.`);
    }
}

module.exports = config;