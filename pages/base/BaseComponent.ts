import { Locator, Page } from "playwright";

export class BaseComponent {
    protected page: Page;
    protected wrapper: () => Locator
    constructor(page: Page, wrapper: () => Locator) {
        this.page = page
        this.wrapper = wrapper
    }
}