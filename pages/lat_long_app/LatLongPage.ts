import { Page } from "playwright";
import { BasePage } from "../base/BasePage";
import { ReporterWrapper } from "../base/ReporterWrapper";
import { FindForm } from "./components/find-form/FindForm";
import { ResultSection } from "./components/result-section/ResultSection";

export class LatLongPage extends BasePage {
    private latLongFormWrapper() { return this.page.locator('#frmPlace') }
    private resultSectionWrapper() { return this.page.locator('//div[contains(., "Lat Long") and contains(@class, "bg-gray")]') }

    get findForm() {
        return new FindForm(this.page, () => this.latLongFormWrapper())
    }

    get resultSection() {
        return new ResultSection(this.page, () => this.resultSectionWrapper())
    }

    constructor(page: Page) {
        super(page)
        this.requiredLocators = [
            this.latLongFormWrapper()
        ]
    }

    async open() {
        return await ReporterWrapper.addStep('Open Lat Long Page', async () => {
            await this.page.goto('https://www.latlong.net/', {
                waitUntil: 'domcontentloaded'
            })
            await this.checkIfPageLoaded()
            return this
        })
    }

}