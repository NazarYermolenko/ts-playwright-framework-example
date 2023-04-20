import { Page } from "playwright";

export class BaseComponent {
    private page: Page;
    constructor(page: Page) {
        this.page = page
    }
}