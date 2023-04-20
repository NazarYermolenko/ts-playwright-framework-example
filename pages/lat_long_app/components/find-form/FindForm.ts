import { Locator, Page } from "playwright";
import { BaseComponent } from "../../../base/BaseComponent";
import { ReporterWrapper } from "../../../base/ReporterWrapper";

export class FindForm extends BaseComponent {
    placeNameInput() { return this.wrapper().locator('#place') }
    findButton() { return this.wrapper().locator('#btnfind') }

    constructor(page: Page, wrapper: () => Locator) {
        super(page, wrapper)
    }

    async findFor(place: string) {
        await ReporterWrapper.addStep(`Find for ${place}`, async () => {
            await this.placeNameInput().fill('')
            await this.placeNameInput().type(place)
            await this.findButton().click()
        })
    }
}