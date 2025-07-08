package com.nickaflick.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

public class ContactPage {

    private final WebDriver driver;
    private final By name = By.id("name");
    private final By email = By.id("email");
    private final By message = By.id("message");
    private final By sendBtn = By.id("send-button");
    private final By subscribeCheckBox = By.id("check-box");

    public ContactPage(WebDriver driver) {
        this.driver = driver;
    }

    public void open() {
        driver.get("http://localhost:3000/contact");
    }

    public void typeName(String message) {
        driver.findElement(name).clear();
        driver.findElement(name).sendKeys(message);
    }

    public void typeEmail(String message) {
        driver.findElement(email).clear();
        driver.findElement(email).sendKeys(message);
    }

    public void typeMessage(String message) {
        driver.findElement(this.message).clear();
        driver.findElement(this.message).sendKeys(message);
    }

    public void clickSend() {
        driver.findElement(sendBtn).click();
    }

    public void clickSubscribe() {
        driver.findElement(subscribeCheckBox).click();
    }
}
