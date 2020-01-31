import * as Loki from "lokijs";

export abstract class DatabaseService {

  private static _db: Loki = new Loki("headerIntercept", {
    autoload: true,
    autoloadCallback: DatabaseService.databaseInitialize,
    autosave: true,
    autosaveInterval: 10000
  });

  private static databaseInitialize() {
    Object.values(DATABASE_COLLECTIONS).forEach(collection => {
      console.log(collection);
      if (!DatabaseService._db.getCollection(collection)) {
        DatabaseService._db.addCollection(collection);
      }
    });
  }

  constructor() {
  }

  public collectionExists(collectionName: string): boolean {
    return this.db.collections.some(collection => {
      return collection.name === collectionName;
    });
  }

  public clearDownCollection(collectionName: string): boolean {
    this.db.removeCollection(collectionName);

    return !this.collectionExists(collectionName);
  }

  public get db(): Loki {
    return DatabaseService._db;
  }
}

export enum DATABASE_COLLECTIONS {
  PROFILES = "profiles"
}
