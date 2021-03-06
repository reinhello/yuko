"use strict";

/**
* Represents a collection of a base object
* @extends Map
* @property {Class} base The base class for all base objects
* @property {Number?} limit Max number of base items to hold
*/
class Collection extends Map {
    constructor(base, limit) {
        super();
        this.base = base;
        this.limit = limit;
    }

    /**
    * Add an object
    * @param {Object} obj The object data
    * @param {String} obj.id The ID of the object
    * @param {Class} [extra] An extra parameter the constructor may need
    * @param {Boolean} [replace] Whether to replace an existing object with the same ID
    * @returns {Class}
    */
    add(obj, extra, replace) {
        if (this.limit === 0) {
            return (obj instanceof this.base || obj.constructor.name === this.base.name) ? obj : new this.base(obj, extra);
        }

        if (obj.id == null) {
            throw new Error("Missing object id");
        }

        const existing = this.get(obj.id);

        if (existing && !replace) {
            return existing;
        }

        if (!(obj instanceof this.base || obj.constructor.name === this.base.name)) {
            obj = new this.base(obj, extra);
        }

        this.set(obj.id, obj);

        if (this.limit && this.size > this.limit) {
            const iter = this.keys();

            while (this.size > this.limit) {
                this.delete(iter.next().value);
            }
        }

        return obj;
    }

    /**
     * Returns true if all elements satisfy the condition
     * @param {Function} func A function that takes an object and returns true or false
     * @returns {Boolean}
     */
    every(func) {
        for (const item of this.values()) {
            if (!func(item)) {
                return false;
            }
        }

        return true;
    }

    /**
    * Return all the objects that make the function evaluate true
    * @param {Function} func A function that takes an object and returns true if it matches
    * @returns {Array<Class>}
    */
    filter(func) {
        const arr = [];

        for (const item of this.values()) {
            if (func(item)) {
                arr.push(item);
            }
        }

        return arr;
    }

    /**
    * Return the first object to make the function evaluate true
    * @param {Function} func A function that takes an object and returns true if it matches
    * @returns {Class?}
    */
    find(func) {
        for (const item of this.values()) {
            if (func(item)) {
                return item;
            }
        }

        return undefined;
    }

    /**
    * Return an array with the results of applying the given function to each element
    * @param {Function} func A function that takes an object and returns something
    * @returns {Array}
    */
    map(func) {
        const arr = [];

        for (const item of this.values()) {
            arr.push(func(item));
        }

        return arr;
    }

    /**
    * Get a random object from the Collection
    * @returns {Class?}
    */
    random() {
        const index = Math.floor(Math.random() * this.size);
        const iter = this.values();

        for (let i = 0; i < index; ++i) {
            iter.next();
        }

        return iter.next().value;
    }

    /**
     * Returns a value resulting from applying a function to every element of the collection
     * @param {Function} func A function that takes the previous value and the next item and returns a new value
     * @param {any} [initialValue] The initial value passed to the function
     * @returns {any}
     */
    reduce(func, initialValue) {
        const iter = this.values();
        let val;
        let result = initialValue === undefined ? iter.next().value : initialValue;

        while ((val = iter.next().value) !== undefined) {
            result = func(result, val);
        }

        return result;
    }

    /**
    * Remove an object
    * @param {Object} obj The object
    * @param {String} obj.id The ID of the object
    * @returns {Class?}
    */
    remove(obj) {
        const item = this.get(obj.id);

        if (!item) {
            return null;
        }

        this.delete(obj.id);
        return item;
    }

    /**
     * Returns true if at least one element satisfies the condition
     * @param {Function} func A function that takes an object and returns true or false
     * @returns {Boolean}
     */
    some(func) {
        for (const item of this.values()) {
            if (func(item)) {
                return true;
            }
        }

        return false;
    }

    /**
    * Update an object
    * @param {Object} obj The updated object data
    * @param {String} obj.id The ID of the object
    * @param {Class} [extra] An extra parameter the constructor may need
    * @param {Boolean} [replace] Whether to replace an existing object with the same ID
    * @returns {Class}
    */
    update(obj, extra, replace) {
        if (!obj.id && obj.id !== 0) {
            throw new Error("Missing object id");
        }

        const item = this.get(obj.id);

        if (!item) {
            return this.add(obj, extra, replace);
        }

        item.update(obj, extra);
        return item;
    }

    toString() {
        return `[Collection<${this.base.name}>]`;
    }

    toJSON() {
        const json = {};

        for (const item of this.values()) {
            json[item.id] = item;
        }

        return json;
    }
}

module.exports = Collection;