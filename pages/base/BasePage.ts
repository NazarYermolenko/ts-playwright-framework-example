import { Locator, Page } from 'playwright'
import { RequiredLocators } from './page_processing/RequiredLocators'
import { LocatorState } from './page_processing/LocatorState'
import { ReporterWrapper } from './ReporterWrapper'

export class BasePage implements RequiredLocators {
    protected page: Page
    protected requiredLocators: Locator[] = []
    constructor(page: Page) {
        this.page = page
    }

    getRequiredLocators(): Locator[] {
        return this.requiredLocators
    }


    private async getRequiredLocatorsLoadState(): Promise<LocatorState[]> {
        return Promise.all(...[this.requiredLocators.map(async locator => {
            const locatorState: LocatorState = {
                locator,
                isLoaded: false
            }

            await locator.first().waitFor()
                .then(() => {
                    locatorState.isLoaded = true
                }).catch(() => {
                    ReporterWrapper.addStep(`Locator ${locator} is not loaded`, () => { })
                })

            return locatorState
        })])

    }

    async checkIfPageLoaded() {
        await ReporterWrapper.addStep(`Checking if page ${this.constructor.name} load`, async () => {
            const locatorStates = await this.getRequiredLocatorsLoadState()
            const failedLocators = locatorStates.filter(locatorState => !locatorState.isLoaded)
            if (failedLocators.length > 0) {
                throw new Error(`Page ${this.constructor.name} wasn't loaded:\n\nFailed Locators:${JSON.stringify(failedLocators, undefined, 4)}`)
            }
        })

    }
}