const Page = require('./Page')
const { remote } = require('webdriverio')

class LoginPage extends Page{
    constructor(driver){
        super(driver)
    }
    get burgerButton() {return this.driver.$('//*[@content-desc="open menu"]/android.widget.ImageView')}
    get loginButton() {return this.driver.$('~menu item log in')}
    get usernameInput() {return this.driver.$('~Username input field')}
    get passwordInput() {return this.driver.$('~Password input field')}
    get submitButton() {return this.driver.$('~Login button')}

    async openPage(){
        await this.burgerButton.click()
        await this.loginButton.click()
    }
    async loginProcess(){
        await this.usernameInput.setValue('bob@example.com')
        await this.passwordInput.setValue('10203040')
        await this.submitButton.click()
    }
}
module.exports = LoginPage