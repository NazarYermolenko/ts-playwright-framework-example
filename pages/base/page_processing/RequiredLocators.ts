import { Locator } from "playwright";

export interface RequiredLocators {
    getRequiredLocators(): Locator[]
}