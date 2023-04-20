import { Locator } from "playwright";

export interface LocatorState {
    locator: Locator
    isLoaded: boolean
}