const Page = require('./Page')
const { remote } = require('webdriverio')

class DetailProductPage extends Page{
    constructor(driver){
        super(driver)
    }
    get burgerButton() {return this.driver.$('//*[@content-desc="open menu"]/android.widget.ImageView')}
    get title() {return this.driver.$('//android.view.ViewGroup[@content-desc="container header"]/android.widget.TextView')}
    get modalReviewTitle(){return this.driver.$('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.widget.TextView')}
    get closeModalButton() {return this.driver.$('~Close Modal button')}
    get increaseQtyButton(){return this.driver.$('//android.view.ViewGroup[@content-desc="counter plus button"]/android.widget.ImageView')}
    get decreaseQtyButton() {return this.driver.$('//android.view.ViewGroup[@content-desc="counter minus button"]/android.widget.ImageView')}
    get qty() {return this.driver.$('//android.view.ViewGroup[@content-desc="counter amount"]/android.widget.TextView')}
    get colorBlack() {return this.driver.$('//android.view.ViewGroup[@content-desc="black circle"]/android.view.ViewGroup')}
    get colorBlue(){return this.driver.$('//android.view.ViewGroup[@content-desc="blue circle"]/android.view.ViewGroup')}
    get colorGray() {return this.driver.$('//android.view.ViewGroup[@content-desc="gray circle"]/android.view.ViewGroup')}
    get colorRed(){return this.driver.$('//android.view.ViewGroup[@content-desc="red circle"]/android.view.ViewGroup')}
    get addToCartButton() { return this.driver.$('~Add To Cart button')}

    async reviewStar(star){
        await this.driver.$(`//android.view.ViewGroup[@content-desc="review star ${star}"]/android.widget.TextView`).click()
    }

    async closeModal(){
        await this.modalReviewTitle.waitForExist()
        await this.closeModalButton.click()
    }

    async scrollDown(){
        await this.driver.touchPerform([
            { action: 'press', options: { x: 353, y: 940 } },
            { action: 'wait', options: { ms: 500 } },
            { action: 'moveTo', options: { x: 353, y: 576 } },
            { action: 'release' },
        ])
    }
    async scrollUp(){ 
        await this.driver.touchPerform([
            { action: 'press', options: { x: 377, y: 340 } },
            { action: 'wait', options: { ms: 500 } },
            { action: 'moveTo', options: { x: 377, y: 1000 } },
            { action: 'release' },
    ])}

    async increaseQtyProduct(){
        await this.scrollDown()
        await this.increaseQtyButton.click()
    }
    async decreaseQtyProduct(){
        await this.scrollDown()
        await this.decreaseQtyButton.click()
    }
    async addToCart(){
        await this.scrollDown()
        await this.addToCartButton.click()
    }
}
module.exports = DetailProductPage