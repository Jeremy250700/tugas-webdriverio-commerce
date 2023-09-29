const Page = require('./Page')
const { remote } = require('webdriverio')

class ReviewOrderPage extends Page{
    constructor(driver){
        super(driver)
    }
    get placeOrderButton() {return this.driver.$('~Place Order button')}
    async scrollDown(){
        await this.driver.touchPerform([
            { action: 'press', options: { x: 353, y:  977} },
            { action: 'wait', options: { ms: 500 } },
            { action: 'moveTo', options: { x: 353, y: 149 } },
            { action: 'release' },
        ])
    }
    async reviewOrderProcess(){
        await this.scrollDown()
        await this.placeOrderButton.click()
    }
}
module.exports = ReviewOrderPage