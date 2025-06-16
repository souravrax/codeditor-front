export default class unordered_set {
    values: { [key: string]: string };
    constructor(array: string[]) {
        this.values = {}
        for (let i of array) {
            this.values[i] = i;
        }
    }
    insert(value: string) {
        this.values[value] = value;
    }
    find(value: string) {
        return this.values[value] !== undefined;
    }
    erase(value: string) {
        delete this.values[value];
    }
};