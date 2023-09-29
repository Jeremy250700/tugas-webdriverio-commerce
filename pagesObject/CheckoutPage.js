const Page = require('./Page')
const { remote } = require('webdriverio')

class CheckoutPage extends Page{
    constructor(driver){
        super(driver)
    }
    get checkoutTitle(){return this.driver.$('//android.view.ViewGroup[@content-desc="container header"]/android.widget.TextView')}
    get fullNameField(){return this.driver.$('~Full Name* input field')}
    get addressLine1Field() {return this.driver.$('~Address Line 1* input field')}
    get addressLine2Filed() {return this.driver.$('~Address Line 2 input field')}
    get cityField() {return this.driver.$('~City* input field')}
    get regionField() {return this.driver.$('~State/Region input field')}
    get zipcodeField() {return this.driver.$('~Zip Code* input field')}
    get countryField() {return this.driver.$('~Country* input field')}
    get toPaymentButton() {return this.driver.$('~To Payment button')}

    async scrollDown(){
        await this.driver.touchPerform([
            { action: 'press', options: { x: 353, y:  977} },
            { action: 'wait', options: { ms: 500 } },
            { action: 'moveTo', options: { x: 353, y: 149 } },
            { action: 'release' },
        ])
    }

    async checkoutProcess(fullname,addressLine1,addressLine2,city,region,zipcode,country){
        await this.fullNameField.setValue('Jeremy')
        await this.addressLine1Field.setValue('Jl. We live no 69')
        await this.addressLine2Filed.setValue('')
        await this.driver.pause(500)
        await this.scrollDown()
        await this.cityField.setValue("Kota We love")
        await this.regionField.setValue('We lie')
        await this.zipcodeField.setValue('1234')
        await this.countryField.setValue('Monday left me broken')
        await this.driver.pause(500)
        await this.toPaymentButton.click()
    }
}
module.exports = CheckoutPage