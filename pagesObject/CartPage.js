const Page = require('./Page')
const { remote } = require('webdriverio')

class CartPage extends Page{
    constructor(driver){
        super(driver)
    }
    get cartButton(){return this.driver.$('//android.view.ViewGroup[@content-desc="cart badge"]/android.widget.ImageView')}
    get cartTitle(){return this.driver.$('//android.view.ViewGroup[@content-desc="container header"]/android.widget.TextView')}
    get cartBadge() {return this.driver.$('//android.view.ViewGroup[@content-desc="cart badge"]/android.widget.TextView')}
    get productName(){return this.driver.$('~product label')}
    get increaseQtyButton() {return this.driver.$('//android.view.ViewGroup[@content-desc="counter plus button"]/android.widget.ImageView')}
    get decreaseQtyButton(){return this.driver.$('//android.view.ViewGroup[@content-desc="counter minus button"]/android.widget.ImageView')}
    get qty() {return this.driver.$('//android.view.ViewGroup[@content-desc="counter amount"]/android.widget.TextView')}
    get colorBlack() {return this.driver.$('//android.view.ViewGroup[@content-desc="black circle"]/android.view.ViewGroup')}
    get colorBlue(){return this.driver.$('//android.view.ViewGroup[@content-desc="blue circle"]/android.view.ViewGroup')}
    get colorGray() {return this.driver.$('//android.view.ViewGroup[@content-desc="gray circle"]/android.view.ViewGroup')}
    get colorRed(){return this.driver.$('//android.view.ViewGroup[@content-desc="red circle"]/android.view.ViewGroup')}
    get removeItemButton(){return this.driver.$('//android.view.ViewGroup[@content-desc="remove item"]/android.widget.TextView')}
    get totalQty(){return this.driver.$('~total number')}
    get totalPrice(){return this.driver.$('~total price')}
    get checkoutButton() {return this.driver.$('~Proceed To Checkout button')}
    get shoppingButton() {return this.driver.$('~Go Shopping button')}

    async getProductNameMoreThanOne(product){
        return await this.driver.$(`(//android.widget.TextView[@content-desc="product label"])[${product}]`).getText()
    }
    async removeItemMoreThanOne(product){
        return await this.driver.$(`(//android.view.ViewGroup[@content-desc="remove item"])[${product}]/android.widget.TextView`).click()
    }

}
module.exports = CartPage