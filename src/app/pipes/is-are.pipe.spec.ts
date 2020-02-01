import { IsArePipe } from './is-are.pipe';

describe('IsArePipe', () => {

  let pipe: IsArePipe;

  beforeEach(() => {
    pipe = new IsArePipe();
  });

  it ('should return is when the value passed in is a string of "1"', () => {
    const expected: string = 'is';

    const actual: string = pipe.transform('1');

    expect(actual).toEqual(expected);
  });

  it ('should return are when the value passed in is a string that is not "1"', () => {
    const expected: string = 'are';

    const actual: string = pipe.transform('2');

    expect(actual).toEqual(expected);
  });

  it ('should return is when the value passed in is a number of 1', () => {
    const expected: string = 'is';

    const actual: string = pipe.transform(1);

    expect(actual).toEqual(expected);
  });

  it ('should return are when the value passed in is a number that is not 1', () => {
    const expected: string = 'are';

    const actual: string = pipe.transform(2);

    expect(actual).toEqual(expected);
  });

  it ('should return the passed in value alongside is/are when option is set', () => {
    const expected: string = '1 is';

    const actual: string = pipe.transform('1', true);

    expect(actual).toEqual(expected);
  });

  it ('should return null when the value passed in is not a number or string', () => {
    const actual: string = pipe.transform({});

    expect(actual).toBeNull();
  });

});
