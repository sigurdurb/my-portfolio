"use strict"
describe('Login Tests', function() {
    var CONFIG = {
        BASEURL: 'http://localhost:8089/src/',
        HOME: '/',
        ABOUT: '/about'
    }
    var CORRECT_ERROR_MSG = "Login failed!";
    var INVALID_ERROR_MSG = "To the batmobile"

    var userValid = {
        username: "smu",
        password: "smu"
    }
    
    var userInvalid = {
        usernname: "smu",
        password: "barf"
    }
    
    // Variables initialized in tests
    var user;
    var ERROR_MSG;

    describe("Valid user", function() {
        beforeEach(function() {
            
            // Arrange
            browser.get(CONFIG.BASEURL);
            user = userValid;
        });
        it("should take url to /about by clicking 'button'", function() {
            
            // Act
            element(by.model("username")).sendKeys(user.username);
            element(by.model("password")).sendKeys(user.password);
            element(by.css("button")).click();

            // Assert
            expect(browser.getLocationAbsUrl()).toBe(CONFIG.ABOUT);
        });

        it("should take url to /about by clicking by buttonText 'Login'", function() {
            
            // Act
            element(by.model("username")).sendKeys(user.username);
            element(by.model("password")).sendKeys(user.password);
            element(by.buttonText("Login")).click();

            // Assert
            expect(browser.getLocationAbsUrl()).toBe(CONFIG.ABOUT);
        });

    });

    describe("Invalid user/pass", function() {
        beforeEach(function() {
            
            // Arrange
            browser.get(CONFIG.BASEURL);
            user = userInvalid;
            
        });
        it("should take url to '/'", function() {
            
            // Act
            element(by.model("username")).sendKeys(user.username);
            element(by.model("password")).sendKeys(user.password);
            element(by.css("button")).click();

            // Assert
            expect(browser.getLocationAbsUrl()).toBe(CONFIG.HOME);
        });
        it("should get an errorMessage to appear", function() {
            
            // Act
            element(by.model("username")).sendKeys(user.username);
            element(by.model("password")).sendKeys(user.password);
            element(by.css("button")).click();

            // Assert
            expect($('[ng-if=errorMessage]').isDisplayed()).toBeTruthy();
        });
        it("should display the correct errormsg: 'Login failed!'", function() {
            
            // Arrange
            ERROR_MSG = CORRECT_ERROR_MSG;

            // Act
            element(by.model("username")).sendKeys(user.username);
            element(by.model("password")).sendKeys(user.password);
            element(by.css("button")).click();

            // Assert
            expect($('[ng-if=errorMessage]').getText()).toEqual(ERROR_MSG);
        });
        it("should Not display errormsg: 'To the batmobile' ", function() {
            
            // Arrange
            ERROR_MSG = INVALID_ERROR_MSG;

            // Act
            element(by.model("username")).sendKeys(user.username);
            element(by.model("password")).sendKeys(user.password);
            element(by.css("button")).click();

            // Assert
            expect($('[ng-if=errorMessage]').getText()).not.toEqual(ERROR_MSG);
        });
    });
});
