import { Locator, Page } from "playwright";
import { BaseComponent } from "../../base/BaseComponent";
import { ReporterWrapper } from "../../base/ReporterWrapper";

export class FindForm extends BaseComponent {
    private formWrapper: () => Locator;

    placeNameInput() { return this.formWrapper().locator('#place') }
    findButton() { return this.formWrapper().locator('#btnfind') }

    constructor(page: Page, formWrapper: () => Locator) {
        super(page)
        this.formWrapper = formWrapper
    }

    async findFor(place: string) {
        await ReporterWrapper.addStep(`Find for ${place}`, async () => {
            await this.placeNameInput().fill('')
            await this.placeNameInput().type(place)
            await this.findButton().click()
        })
    }
}