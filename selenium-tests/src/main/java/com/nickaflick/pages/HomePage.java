package com.nickaflick.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

public class HomePage {
    private final WebDriver driver;
    private final By browseBtn = By.id("browse-button-top");
    private final By moviePoster = By.id("movie-poster");

    private final String url = "http://localhost:3000/";

    public HomePage(WebDriver driver) {
        this.driver = driver;
    }

    public void open() {
        driver.get(url);
    }

    public void clickBrowse() {
        driver.findElement(browseBtn).click();
    }

    public By getBrowseBtn() {
        return browseBtn;
    }

    public void clickCarouselPoster() {
        driver.findElement(moviePoster).click();
    }
}
