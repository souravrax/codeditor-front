export default class unordered_set {
    constructor(array: any) {
        this.values = {};
        for (let i of array) {
            this.values[i] = i;
        }
    }
    insert(value: string | number) {
        this.values[value] = value;
    }
    find(value: string | number) {
        return this.values[value] !== undefined;
    }
    erase(value: string | number) {
        delete this.values[value];
    }
}
