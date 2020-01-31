export class MockLocalstorage {

    private store: {[key: string]: string};

    private constructor() {
        this.store = {};
    }

    getItem(key: string): string {
        return key in this.store ? this.store[key] : null;
    }

    setItem(key: string, value: string): void {
        this.store[key] = `${value}`;
    }

    removeItem(key: string): void {
        delete this.store[key];
    }

    clear(): void {
        this.store = {};
    }

    public static createStore(): MockLocalstorage {
        return new MockLocalstorage();
    }
}