package com.nickaflick.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

public class NavBarPage {

    private final WebDriver driver;
    private final By homeButton = By.id("home-button");
    private final By searchButton = By.id("search-button");
    private final By contactButton = By.id("contact-button");

    public NavBarPage(WebDriver driver) {
        this.driver = driver;
    }

    public void clickHome() {
        driver.findElement(homeButton).click();
    }

    public void clickSearch() {
        driver.findElement(searchButton);
    }

    public void clickContact() {
        driver.findElement(contactButton);
    }
    
}
