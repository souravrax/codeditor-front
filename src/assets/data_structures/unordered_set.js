export default class unordered_set {
    constructor(array) {
        this.values = {}
        for (let i of array) {
            this.values[i] = i;
        }
    }
    insert(value) {
        this.values[value] = value;
    }
    find(value) {
        return this.values[value] !== undefined;
    }
    erase(value) {
        delete this.values[value];
    }
};