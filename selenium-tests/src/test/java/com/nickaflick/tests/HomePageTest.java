package com.nickaflick.tests;

import java.time.Duration;

import org.junit.jupiter.api.AfterEach;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import com.nickaflick.pages.HomePage;

public class HomePageTest {

    private WebDriver driver;
    private HomePage homePage;
    private WebDriverWait wait;

    @BeforeEach
    public void setup() {
        driver = new ChromeDriver();
        homePage = new HomePage(driver);
        wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        homePage.open();
    }

    @AfterEach
    public void tearDown(){
        driver.quit();
    }

    @Test
    public void testBrowseButton() {
        wait.until(ExpectedConditions.presenceOfElementLocated(homePage.getBrowseBtn()));

        homePage.clickBrowse();

        wait.until(ExpectedConditions.urlContains("search"));
        assertEquals(driver.getCurrentUrl(), "http://localhost:3000/search", "URL should be search page.");
    }
    @Test
    public void testCarouselClick() {
        homePage.clickCarouselPoster();
        wait.until(ExpectedConditions.presenceOfElementLocated(By.id("rent-button")));

        assertTrue(driver.findElement(By.id("rent-button")).isDisplayed(), "Rent button should be displayed");

    }

    
}
