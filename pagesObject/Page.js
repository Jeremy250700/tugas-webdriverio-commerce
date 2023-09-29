const { remote } = require("webdriverio")

class Page {
    constructor(driver){
        this.driver = driver
    }
}
module.exports = Page