import { test } from "@playwright/test";

export class ReporterWrapper {
    static async addStep<T>(title: string, body: () => T): Promise<T> {
        return await test.step<T>(title, body)
    }
}