const { expec } = require('chai')
const setupDriver = require('../utils/setupDriver')
const LoginPage = require('../pagesObject/LoginPage')

describe.skip('FT_000_test_case_template',function(){
    /**@type {WebdriverIO.Browser} */ let driver
    /**@type {LoginPage} */ let loginPage

    before(async function(){
        driver = await setupDriver()
        loginPage = new LoginPage(driver)
        loginPage.openPage()
        loginPage.loginProcess()
    })
    describe('test case',function(){
        it('expected result',async function(){

        })    
    })
    afterEach(async function(){
        await driver.pause(3000)
    })
    after(async function(){
        await driver.deleteSession()
    })
})