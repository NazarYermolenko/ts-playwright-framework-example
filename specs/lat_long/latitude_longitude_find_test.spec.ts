import { expect, test } from "@playwright/test";
import { LatLongPage } from "../../pages/lat_long_app/LatLongPage";
import { GPSCoordinates } from "../../pages/lat_long_app/components/result-section/GPSCoordinates";

type LatLongTestData = {
    cityName: string,
    latLong: string,
    gpsCoordinates: GPSCoordinates
}


const testData: LatLongTestData[] = [
    {
        cityName: 'Lviv',
        latLong: '(49.839684, 24.029716)',
        gpsCoordinates: { lat: "49° 50' 22.8624'' N", long: "24° 1' 46.9776'' E" }
    }
]


testData.map(data => {
    test(`Lat Long -> Find for ${data.cityName}`, async ({ page }) => {
        const latLongPage = await new LatLongPage(page).open()
        await latLongPage.findForm.findFor(data.cityName)
        const latLong = await latLongPage.resultSection.getLatLong()
        const gpsCoordinates = await latLongPage.resultSection.getGPSCoordinates()

        expect(latLong).toEqual(data.latLong)
        expect(gpsCoordinates).toEqual(data.gpsCoordinates)
    })
})

