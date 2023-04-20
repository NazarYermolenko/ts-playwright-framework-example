import { Locator, Page } from "playwright";
import { BaseComponent } from "../../../base/BaseComponent";
import { ReporterWrapper } from "../../../base/ReporterWrapper";
import { GPSCoordinates } from "./GPSCoordinates";

export class ResultSection extends BaseComponent {
    latLongValue() { return this.wrapper().locator('#latlngspan') }

    gpslatValue() { return this.wrapper().locator('#dms-lat') }
    gpsLongValue() { return this.wrapper().locator('#dms-lng') }

    constructor(page: Page, wrapper: () => Locator) {
        super(page, wrapper)
    }

    async getGPSCoordinates(): Promise<GPSCoordinates> {
        return await ReporterWrapper.addStep('Getting GPS Coordinates', async () => {
            const gpsCoordinates: GPSCoordinates = {
                lat: (await this.gpslatValue().textContent())?.trim(),
                long: (await this.gpsLongValue().textContent())?.trim(),
            }
            return gpsCoordinates
        })
    }
    async getLatLong() {
        return await ReporterWrapper.addStep('Getting lat long', async () => {
            return await this.latLongValue().textContent()
        })
    }
}