package com.nickaflick.tests;

import java.time.Duration;

import org.junit.jupiter.api.AfterEach;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import com.nickaflick.pages.NavBarPage;

public class NavBarTest {

    private WebDriver driver;
    private NavBarPage navBarPage;
    private WebDriverWait wait;
    private final String baseUrl = System.getProperty("base.url", "http://localhost:3000");

    @BeforeEach
    public void setup() {
        driver = new ChromeDriver();
        navBarPage = new NavBarPage(driver);
        wait = new WebDriverWait(driver, Duration.ofSeconds(5));
        driver.get(baseUrl);
    }

    @AfterEach
    public void tearDown() {
        driver.quit();
    }
    @Test
    public void navigate() {
        navBarPage.clickSearch();
        wait.until(ExpectedConditions.urlContains("search"));
        assertEquals(driver.getCurrentUrl(), baseUrl + "/search");

        navBarPage.clickContact();
        wait.until(ExpectedConditions.urlContains("contact"));
        assertEquals(driver.getCurrentUrl(), baseUrl + "/contact");

        navBarPage.clickHome();
        wait.until(ExpectedConditions.urlMatches("^http://localhost:3000/?$"));
        assertTrue(driver.getCurrentUrl().matches("^http://localhost:3000/?$"));
    }
    
}
