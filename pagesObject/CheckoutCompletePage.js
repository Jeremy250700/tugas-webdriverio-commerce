const Page = require('./Page')
const { remote } = require('webdriverio')

class CheckoutCompletePage extends Page{
    constructor(driver){
        super(driver)
    }
    get title() {return this.driver.$('//android.view.ViewGroup[@content-desc="checkout complete screen"]/android.widget.ScrollView/android.view.ViewGroup/android.widget.TextView[1]')}
    get continueShopingButton() {return this.driver.$('//android.view.ViewGroup[@content-desc="Continue Shopping button"]')}
    get logoutButton(){return this.driver.$('~menu item log out')}
}
module.exports = CheckoutCompletePage