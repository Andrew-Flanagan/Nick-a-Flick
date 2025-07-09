package com.nickaflick.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

public class SearchPage {
    private final WebDriver driver;
    private final By moviePoster = By.id("movie-poster");
    private final By genreFilter = By.id("genre-select");
    private final By sortFilter = By.id("sort-select");
    private final By gridButton = By.id("grid-button");
    private final By tableButton = By.id("table-button");
    private final By searchInput = By.id("search-input");
    private final By nextButton = By.id("next-button");
    private final By prevButton = By.id("prev-button");
    private final By pageGroup = By.id("button-group");
    private final By gridPoster = By.className("movie-poster");
    

    public SearchPage(WebDriver driver) {
        this.driver = driver;
    }

    public void clickMoviePoster() {
        driver.findElement(moviePoster).click();
    }

    public void setGenreFilter(String genre) {
        driver.findElement(genreFilter).click();
        driver.findElement(By.id(genre)).click();
    }

    public void setSortFilter(String sort) {
        driver.findElement(sortFilter).click();
        driver.findElement(By.id(sort)).click();
    }

    public void clickGridView() {
        driver.findElement(gridButton).click();
    }

    public void clickTableView() {
        driver.findElement(tableButton).click();
    }

    public void enterSearchTerm(String input) {
        driver.findElement(searchInput).clear();
        driver.findElement(searchInput).sendKeys(input);
    }

    public void clickNextButton() {
        driver.findElement(nextButton);
    }

    public void clickPrevButton() {
        driver.findElement(prevButton);
    }

    public WebElement getPageGroup() {
        return driver.findElement(pageGroup);
    }

    public void clickGridPoster() {
        driver.findElement(gridPoster).click();
    }


}
