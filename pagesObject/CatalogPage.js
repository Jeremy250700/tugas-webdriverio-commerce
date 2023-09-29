const Page = require('./Page')
const { remote } = require('webdriverio')

class CatalogPage extends Page{
    constructor(driver){
        super(driver)
    }
    get burgerButton() {return this.driver.$('//*[@content-desc="open menu"]/android.widget.ImageView')}
    get catalogButton() {return this.driver.$('~menu item catalog')}
    get sortButton(){return this.driver.$('~sort button')}
    get nameAscButton() {return this.driver.$('~nameAsc')}
    get nameDescButton() {return this.driver.$('~nameDesc')}
    get priceAscButton() {return this.driver.$('~priceAsc')}
    get priceDescButton() {return this.driver.$('~priceDesc')}
    get productName1() {return this.driver.$('(//android.widget.TextView[@content-desc="store item text"])[1]')}
    get productName2() {return this.driver.$('(//android.widget.TextView[@content-desc="store item text"])[2]')}
    get productPrice1() {return this.driver.$('(//android.widget.TextView[@content-desc="store item price"])[1]')}
    get productPrice2() {return this.driver.$('(//android.widget.TextView[@content-desc="store item price"])[2]')}

    async sortByNameAsc(){
        await this.sortButton.click()
        await this.nameAscButton.waitForExist()
        await this.nameAscButton.click()
    }
    async sortByNameDesc(){
        await this.sortButton.click()
        await this.nameDescButton.waitForExist()
        await this.nameDescButton.click()
    }
    async sortByPriceAsc(){
        await this.sortButton.click()
        await this.priceAscButton.waitForExist()
        await this.priceAscButton.click()
    }
    async sortByPriceDesc(){
        await this.sortButton.click()
        await this.priceDescButton.waitForExist()
        await this.priceDescButton.click()
    }
}
module.exports = CatalogPage