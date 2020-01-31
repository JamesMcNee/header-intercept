import { DatabaseService } from "./database.service";
import * as Loki from "lokijs";

describe("DatabaseService", () => {

    it("should create a loki database named headerIntercept", () => {
        const service: DatabaseService = new TestDatabase("testCollection");
        const db: Loki = service.db;

        expect(db.filename).toBe("headerIntercept");
    });

    it("should create a collection named 'testCollection' when initialised", () => {
        const service: DatabaseService = new TestDatabase("testCollection");

        expect(service.collectionExists("testCollection")).toBeTruthy();
    });

    describe("clearDownCollection", () => {
        it("should clear down a collection when called", () => {
            // given
            const service: DatabaseService = new TestDatabase("testCollection");
            expect(service.collectionExists("testCollection")).toBeTruthy();

            // when
            service.clearDownCollection("testCollection")

            // then
            expect(service.collectionExists("testCollection")).toBeFalsy();
        });
    });
});

class TestDatabase extends DatabaseService {
    
}
