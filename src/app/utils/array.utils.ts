export abstract class ArrayUtils {
    
    /**
     * Function which takes an element and an array, adds the element to the array, or replaces when found. 
     * 
     * @param element to append / overwrite existing
     * @param array the array that will be used as a base for what to return
     * @param keyToMatch key that should be used to check equality
     * @returns a new array containing the result of the replacement/append function.
     */
    public static replaceElementWhenMatchFoundElseAppend<T>(element: T, array: T[], keyToMatch: keyof T): T[] {
        return ArrayUtils.replaceElementsWhenMatchFoundElseAppend(array, [element], keyToMatch);
    }

    /**
     * Function which takes two arrays and adds all the items from the second array into the first. 
     * Items that match in both arrays using the provided `keyToMatch` will be taken from the right array and removed from the left; preserving order.
     * Any items that do not match any in the left array will be added to the end; again preserving order.
     * 
     * @param left the original array that will be used as a base for what to return
     * @param right an array of items to add to the left array replacing those which match
     * @param keyToMatch key that should be used to check equality
     * @returns a new array containing the result of the replacement/append function.
     */
    public static replaceElementsWhenMatchFoundElseAppend<T>(left: T[], right: T[], keyToMatch: keyof T): T[] {
        const newArray: T[] = [...left];

        right.forEach((element: T) => {
            const indexOfOriginalElement: number = newArray.findIndex(original => original[keyToMatch] === element[keyToMatch]);
            const indexToUse: number = indexOfOriginalElement !== -1 ? indexOfOriginalElement : newArray.length;

            newArray[indexToUse] = element;
        });

        return newArray;
    }
}