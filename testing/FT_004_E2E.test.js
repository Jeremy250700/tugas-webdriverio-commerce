const { expect } = require('chai')
const setupDriver = require('../utils/setupDriver')
const LoginPage = require('../pagesObject/LoginPage')
const CatalogPage = require('../pagesObject/CatalogPage')
const DetailProductPage = require('../pagesObject/DetailProductPage')
const CartPage = require('../pagesObject/CartPage')
const CheckoutPage = require('../pagesObject/CheckoutPage')
const PaymentPage = require('../pagesObject/PaymentPage')
const ReviewOrderPage = require('../pagesObject/ReviewOrderPage')
const CheckoutCompletePage = require('../pagesObject/CheckoutCompletePage')

describe('FT_004_E2E_Test',function(){
    /**@type {WebdriverIO.Browser} */ let driver
    /**@type {LoginPage} */ let loginPage
    /**@type {CatalogPage} */let catalogPage
    /**@type {DetailProductPage} */let detailProductPage
    /**@type {CartPage} */let cartPage
    /**@type {CheckoutPage} */ let checkoutPage
    /**@type {PaymentPage} */ let paymentPage
    /**@type {ReviewOrderPage} */ let reviewOrderPage
    /**@type {CheckoutCompletePage} */ let checkoutCompletePage 

    before(async function(){
        driver = await setupDriver()
        loginPage = new LoginPage(driver)
        catalogPage = new CatalogPage(driver)
        detailProductPage = new DetailProductPage(driver)
        cartPage = new CartPage(driver)
        checkoutPage = new CheckoutPage(driver)
        paymentPage = new PaymentPage(driver)
        reviewOrderPage = new ReviewOrderPage(driver)
        checkoutCompletePage = new CheckoutCompletePage(driver)
    })
    describe('E2E_001 Mencoba proses pembelian product',function(){
        it('Halaman Checkout Complete berhasil tampil',async function(){
            await loginPage.openPage()
            await loginPage.loginProcess()
            await catalogPage.productName1.click()
            await driver.pause(500)
            await detailProductPage.addToCart()
            await cartPage.cartButton.click()
            await driver.pause(500)
            await cartPage.checkoutButton.click()
            await driver.pause(500)
            await checkoutPage.checkoutProcess()
            await driver.pause(500)
            await paymentPage.paymentProcess()
            await driver.pause(500)
            await reviewOrderPage.reviewOrderProcess()
            await driver.pause(500)
            const title = await checkoutCompletePage.title.getText()
            expect(title).to.equal('Checkout Complete')
        })

    })
   
    afterEach(async function(){
        await driver.pause(1000)
    })
    after(async function(){
        await driver.deleteSession()
    })
})