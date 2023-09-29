const { expect } = require('chai')
const setupDriver = require('../utils/setupDriver')
const LoginPage = require('../pagesObject/LoginPage')
const CatalogPage = require('../pagesObject/CatalogPage')

describe('FT_001_Catalog_Page',function(){
    /**@type {WebdriverIO.Browser} */ let driver
    /**@type {LoginPage} */ let loginPage
    /**@type {CatalogPage} */let catalogPage

    before(async function(){
        driver = await setupDriver()
        loginPage = new LoginPage(driver)
        catalogPage = new CatalogPage(driver)
        await loginPage.openPage()
        await loginPage.loginProcess()
    })
    describe('CP_001 Mencoba fitur sort by name ascending',function(){
        it('Nama product urut sesuai abjad dari A-Z',async function(){
            await catalogPage.sortByNameAsc()
            await driver.pause(1000)
            const p1Name = await catalogPage.productName1.getText()
            const p2Name = await catalogPage.productName2.getText()
            expect(p1Name).to.satisfy(name => name < p2Name)
        })    
    })
    describe('CP_002 Mencoba fitur sort by name descending',function(){
        it('Nama product urut sesuai abjad dari Z-A',async function(){
            await catalogPage.sortByNameDesc()
            await driver.pause(1000)
            const p1Name = await catalogPage.productName1.getText()
            const p2Name = await catalogPage.productName2.getText()
            expect(p1Name).to.satisfy(name => name > p2Name)
        })    
    })
    describe('CP_003 Mencoba fitur sort by price ascending', function(){
        it('Harga product urut dari yang paling kecil sampai yang paling besar', async function(){
            await catalogPage.sortByPriceAsc()
            await driver.pause(1000)
            const p1Price = await catalogPage.productPrice1.getText()
            const p2Price = await catalogPage.productPrice2.getText()
            expect(p1Price).to.satisfy(price => price < p2Price)
        })
    })
    describe('CP_004 Mencoba fitur sort by price descending', function(){
        it('Harga product urut dari yang paling besar sampai yang paling kecil', async function(){
            await catalogPage.sortByPriceDesc()
            await driver.pause(1000)
            const p1Price = await catalogPage.productPrice1.getText()
            const p2Price = await catalogPage.productPrice2.getText()
            expect(p1Price).to.satisfy(price => price > p2Price)
        })
    })
    afterEach(async function(){
        await driver.pause(3000)
    })
    after(async function(){
        await driver.deleteSession()
    })
})