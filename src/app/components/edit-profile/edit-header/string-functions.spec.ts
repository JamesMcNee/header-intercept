import { StringFunctions } from "./string-functions";

describe('string-functions', () => {
    describe('applyBase64Encode', () => {
        it('should base64 encode a string', () => {
            // given
            const input: string = 'Resistance is futile';

            // when
            const actual: string = StringFunctions.getFunctionById('encode64').call({}, input);

            // then
            const expected: string = 'UmVzaXN0YW5jZSBpcyBmdXRpbGU=';
            expect(actual).toEqual(expected);
        });
    });

    describe('applyBase64Decode', () => {
        it('should base64 decode a string', () => {
            // given
            const input: string = 'UmVzaXN0YW5jZSBpcyBmdXRpbGU=';

            // when
            const actual: string = StringFunctions.getFunctionById('decode64').call({}, input);

            // then
            const expected: string = 'Resistance is futile';
            expect(actual).toEqual(expected);
        });
    });
});