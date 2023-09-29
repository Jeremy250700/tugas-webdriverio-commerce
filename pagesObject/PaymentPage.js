const Page = require('./Page')
const { remote } = require('webdriverio')

class PaymentPage extends Page{
    constructor(driver){
        super(driver)
    }
    get fullNameField(){return this.driver.$('~Full Name* input field')}
    get cardNumberField() {return this.driver.$('~Card Number* input field')}
    get cityField() {return this.driver.$('~City* input field')}
    get expirationDateField() {return this.driver.$('~Expiration Date* input field')}
    get securityCodeField() {return this.driver.$('~Security Code* input field')}
    get reviewOrderButton() {return this.driver.$('~Review Order button')}

    async scrollDown(){
        await this.driver.touchPerform([
            { action: 'press', options: { x: 353, y:  977} },
            { action: 'wait', options: { ms: 500 } },
            { action: 'moveTo', options: { x: 353, y: 149 } },
            { action: 'release' },
        ])
    }
    async paymentProcess(fullname,cardNumber,expirationDate,securityCode){
        await this.scrollDown()
        await this.fullNameField.setValue('Jeremy')
        await this.cardNumberField.setValue('12345678910')
        await this.expirationDateField.setValue('61/19')
        await this.securityCodeField.setValue('6090')
        await this.reviewOrderButton.click()
        await this.driver.pause(500)
        await this.reviewOrderButton.click()
    }
}
module.exports = PaymentPage