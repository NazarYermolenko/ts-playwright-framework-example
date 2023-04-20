import { Page } from "playwright";
import { BasePage } from "../base/BasePage";
import { ReporterWrapper } from "../base/ReporterWrapper";
import { FindForm } from "./components/FindForm";

export class LatLongPage extends BasePage {
    latLongFormWrapper() { return this.page.locator('#frmPlace') }

    get findForm() {
        return new FindForm(this.page, () => this.latLongFormWrapper())
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