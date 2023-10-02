const { expect } = require('chai')
const setupDriver = require('../utils/setupDriver')
const LoginPage = require('../pagesObject/LoginPage')
const CatalogPage = require('../pagesObject/CatalogPage')
const DetailProductPage = require('../pagesObject/DetailProductPage')
const CartPage = require('../pagesObject/CartPage')

describe('FT_002_Detail_Product_Page',function(){
    /**@type {WebdriverIO.Browser} */ let driver
    /**@type {LoginPage} */ let loginPage
    /**@type {CatalogPage} */let catalogPage
    /**@type {DetailProductPage} */let detailProductPage
    /**@type {CartPage} */let cartPage
    let notMove = false

    before(async function(){
        driver = await setupDriver()
        loginPage = new LoginPage(driver)
        catalogPage = new CatalogPage(driver)
        detailProductPage = new DetailProductPage(driver)
        cartPage = new CartPage(driver)
        await loginPage.openPage()
        await loginPage.loginProcess()
    })
    describe('DPC_001 Mencoba membuka halaman detail product',function(){
        it('Nama product pada halaman catalog dan detail product sama',async function(){
            const productName = await catalogPage.productName1.getText()
            await catalogPage.productName1.click()
            await driver.pause(1000)
            const productTitle = await detailProductPage.title.getText()
            expect(productName).to.equal(productTitle)
            notMove = true
        })
        
    })
    describe('DPC_002 Mencoba review product dengan bintang 1', function(){
        it('Menampilkan modal dengan text "Thank you for submitting your review!"', async function(){
            await detailProductPage.reviewStar('1')
            await driver.pause(1000)
            const title= await detailProductPage.modalReviewTitle.getText()
            expect(title).to.equal('Thank you for submitting your review!')
            await detailProductPage.closeModal()
            notMove = true
        })
        
    })
    describe('DPC_003 Mencoba review product dengan bintang 3', function(){
        it('Menampilkan modal dengan text "Thank you for submitting your review!"', async function(){
            await detailProductPage.reviewStar('3')
            await driver.pause(1000)
            const title= await detailProductPage.modalReviewTitle.getText()
            expect(title).to.equal('Thank you for submitting your review!')
            await detailProductPage.closeModal()
            notMove = true
        })
        
    })
    describe('DPC_004 Mencoba review product dengan bintang 5', function(){
        it('Menampilkan modal dengan text "Thank you for submitting your review!"', async function(){
            await detailProductPage.reviewStar('5')
            await driver.pause(1000)
            const title= await detailProductPage.modalReviewTitle.getText()
            expect(title).to.equal('Thank you for submitting your review!')
            await detailProductPage.closeModal()
            notMove = true
        })
        
    })
    describe('DPC_005 Mencoba mengubah warna product menjadi biru', function(){
        it('Warna product pada halaman cart berubah menjadi biru',async function(){
            await detailProductPage.colorBlue.click()
            const blueDetailProduct = await detailProductPage.colorBlue.getAttribute('content-desc')
            await detailProductPage.addToCart()
            await driver.pause(500)
            await cartPage.cartButton.click()
            const blueCart = await cartPage.colorBlue.getAttribute('content-desc')
            expect(blueDetailProduct).to.equal(blueCart)
            await driver.pause(500)
            await cartPage.removeItemButton.click()
        })
    })
    describe('DPC_006 Mencoba mengubah warna product menjadi abu abu', function(){
        it('Warna product pada halaman cart berubah menjadi abu abu',async function(){
            await detailProductPage.colorGray.click()
            const grayDetailProduct = await detailProductPage.colorGray.getAttribute('content-desc')
            await detailProductPage.addToCart()
            await driver.pause(500)
            await cartPage.cartButton.click()
            const grayCart = await cartPage.colorGray.getAttribute('content-desc')
            expect(grayDetailProduct).to.equal(grayCart)
            await driver.pause(500)
            await cartPage.removeItemButton.click()

        })
    })
    describe('DPC_007 Mencoba mengubah warna product menjadi merah', function(){
        it('Warna product pada halaman cart berubah menjadi merah',async function(){
            await detailProductPage.colorRed.click()
            const redDetailProduct = await detailProductPage.colorRed.getAttribute('content-desc')
            await detailProductPage.addToCart()
            await driver.pause(500)
            await cartPage.cartButton.click()
            const redCart = await cartPage.colorRed.getAttribute('content-desc')
            expect(redDetailProduct).to.equal(redCart)
            await driver.pause(500)
            await cartPage.removeItemButton.click()

        })
    })
    describe('DPC_008 Mencoba menambah quantity product', function(){
        it('Quantity product bertambah', async function(){
            await detailProductPage.scrollDown()
            await detailProductPage.increaseQtyButton.click()
            await driver.pause(500)
            const qty = await detailProductPage.qty.getText()
            expect(qty).to.equal('2')
            await detailProductPage.decreaseQtyButton.click()
            notMove = true
        })
        
    })
    describe('DPC_009 Mencoba mengurang quantity product', function(){
        it('Quantity product berkurang', async function(){
            await detailProductPage.decreaseQtyButton.click()
            await driver.pause(500)
            const qty = await detailProductPage.qty.getText()
            expect(qty).to.equal('0')
            await detailProductPage.increaseQtyButton.click()
            notMove = true
        })
        
    })
    describe('DPC_010 Mencoba memasukan product ke cart dengan quantity 0',function(){
        it('item tidak muncul pada halaman cart',async function(){
            await detailProductPage.decreaseQtyButton.click()
            await detailProductPage.addToCartButton.click()
            await cartPage.cartButton.click()
            await driver.pause(500)
            const title = await cartPage.cartTitle.getText()
            expect(title).to.equal('No Items')
        })
    })
    describe('DPC_011 Mencoba memasukan product ke cart dengan quantity 1',function(){
        it('badge pada button cart menampilkan angka 1',async function(){
            await detailProductPage.scrollDown()
            await detailProductPage.addToCartButton.click()
            const badge = await cartPage.cartBadge.getText()
            expect(badge).to.equal('1')
           await detailProductPage.scrollUp()
           notMove = true
        })
        it('item muncul pada halaman cart',async function(){
            const detailProductName = await detailProductPage.title.getText()
            await cartPage.cartButton.click()
            await driver.pause(500)
            const title = await cartPage.productName.getText()
            expect(title).to.equal(detailProductName)
            await driver.pause(500)
            await cartPage.removeItemButton.click()
        })
    })
    describe('DPC_012 Mencoba memasukan product ke cart dengan quantity 2',function(){
        it('badge pada button cart menampilkan angka 2',async function(){
            await detailProductPage.scrollDown()
            await detailProductPage.increaseQtyButton.click()
            await detailProductPage.addToCartButton.click()
            const badge = await cartPage.cartBadge.getText()
            expect(badge).to.equal('2')
            await detailProductPage.scrollUp()
            notMove = true
        })
        it('harga item dikali 2',async function(){
            await cartPage.cartButton.click()
            await driver.pause(500)
            const totalPirce = await cartPage.totalPrice.getText()
            expect(totalPirce).to.equal('$59.98')
            await driver.pause(500)
            await cartPage.removeItemButton.click()
        })
    }) 
    afterEach(async function(){
        if(notMove == true){
            await driver.pause(1000)
            notMove = false
        }else{
            await driver.pause(500)
            await cartPage.shoppingButton.click()
            await driver.pause(500)
            await catalogPage.productName1.click()
            await driver.pause(1000)
        }
    })
    after(async function(){
        await driver.deleteSession()
    })
})