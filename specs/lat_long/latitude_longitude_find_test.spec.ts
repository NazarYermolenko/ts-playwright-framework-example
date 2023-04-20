import { test } from "@playwright/test";
import { LatLongPage } from "../../pages/lat_long_app/LatLongPage";

test('Lat Long -> Find for Lviv', async ({ page }) => {
    const latLongPage = await new LatLongPage(page).open()
    await latLongPage.findForm.findFor('Lviv')
})