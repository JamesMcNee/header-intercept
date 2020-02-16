
export abstract class StringFunctions {

    private static functionMap: { [key: string]: (param: string) => string } = {
        'encode64': StringFunctions.applyBase64Encode,
        'decode64': StringFunctions.applyBase64Decode
    };

    public static getFunctionById(id: string): (param: string) => string {
        return StringFunctions.functionMap[id];
    }

    private static applyBase64Encode(input: string): string {
        return btoa(input);
    }

    private static applyBase64Decode(input: string): string {
        return atob(input);
    }
}