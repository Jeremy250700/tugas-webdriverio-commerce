const { expect } = require('chai')
const setupDriver = require('../utils/setupDriver')
const LoginPage = require('../pagesObject/LoginPage')
const CatalogPage = require('../pagesObject/CatalogPage')
const DetailProductPage = require('../pagesObject/DetailProductPage')
const CartPage = require('../pagesObject/CartPage')
const CheckoutPage = require('../pagesObject/CheckoutPage')

describe('FT_003_Cart_Page',function(){
    /**@type {WebdriverIO.Browser} */ let driver
    /**@type {LoginPage} */ let loginPage
    /**@type {CatalogPage} */let catalogPage
    /**@type {DetailProductPage} */let detailProductPage
    /**@type {CartPage} */let cartPage
    /**@type {CheckoutPage} */ let checkoutPage

    before(async function(){
        driver = await setupDriver()
        loginPage = new LoginPage(driver)
        catalogPage = new CatalogPage(driver)
        detailProductPage = new DetailProductPage(driver)
        checkoutPage = new CheckoutPage(driver)
        cartPage = new CartPage(driver)
        await loginPage.openPage()
        await loginPage.loginProcess()
        await catalogPage.productName1.click()
        await driver.pause(500)
        await detailProductPage.addToCart()
        await cartPage.cartButton.click()
        await driver.pause(500)
    })
    describe('CP_001 Mencoba mengurangi quantity product menjadi 0',function(){
        it('Product akan terhapus',async function(){
            await cartPage.decreaseQtyButton.click()
            await driver.pause(500)
            const title = await cartPage.cartTitle.getText()
            expect(title).to.equal('No Items')
            
            await cartPage.shoppingButton.click()
            await catalogPage.productName1.click()
            await detailProductPage.addToCart()
            await cartPage.cartButton.click()
        })
    })
    describe('CP_002 Mencoba menambah quantity product menjadi 2',function(){
        it('Total product bertambah menjadi 2',async function(){
            await cartPage.increaseQtyButton.click()
            await driver.pause(500)
            const totalQty = await cartPage.totalQty.getText()
            expect(totalQty).to.equal('2 items')
        })
        it('Total harga menjdai 2x lipat',async function(){
            const totalPirce = await cartPage.totalPrice.getText()
            expect(totalPirce).to.equal('$59.98')
            await cartPage.decreaseQtyButton.click()
        })
        
    })
    describe('CP_003 Mencoba remove item',function(){
        it('Item berhasil dihapus',async function(){
            await cartPage.removeItemButton.click()
            await driver.pause(500)
            const title = await cartPage.cartTitle.getText()
            expect(title).to.equal('No Items')
            await cartPage.shoppingButton.click()
            await catalogPage.productName1.click()
            await detailProductPage.addToCart()
            await cartPage.cartButton.click()
        })
    })
    describe('CP_004 Mencoba menambahkan 1 item lagi',function(){
        it('Product berhasil ditambahkan',async function(){
            await catalogPage.burgerButton.click()
            await catalogPage.catalogButton.click()
            const productName = await catalogPage.productName2.getText()
            await catalogPage.productName2.click()
            await driver.pause(500)
            await detailProductPage.addToCart()
            await driver.pause(500)
            await cartPage.cartButton.click()
            const cartPorductName = await cartPage.getProductNameMoreThanOne('2')
            expect(productName).to.equal(cartPorductName)
        })
        it('Total quantity bertambah menjadi 2',async function(){
            await driver.pause(500)
            const totalQty = await cartPage.totalQty.getText()
            expect(totalQty).to.equal('2 items')
        })
    })
    describe('CP_005 Mencoba checkout',function(){
        it('berhasil masuk ke halaman checkout',async function(){
            await cartPage.checkoutButton.click()
            await driver.pause(1000)
            const title = await checkoutPage.checkoutTitle.getText()
            expect(title).to.equal('Checkout')
        })
    })
    afterEach(async function(){
        await driver.pause(1000)
    })
    after(async function(){
        await driver.deleteSession()
    })
})