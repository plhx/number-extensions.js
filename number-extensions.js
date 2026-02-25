/**
 * @file number-extensions.js
 * @copyright 2026 PlasticHeart
 */

!(root => {
    /**
     * @template T
     * @type {{Some: new <T>(value: T), None: new <T>()}}
     */
    const { Option, Some, None } = root

    /**
     * @param {number} value
     * @param {Object} options
     * @param {boolean} options.safe
     * @param {boolean} options.saturate
     * @param {boolean} options.unsigned
     * @returns {Option<T>}
     */
    function expr(value, { safe = false, saturate = false, unsigned = false } = {}) {
        if (unsigned) {
            value = Math.max(value, 0)
        }
        if (saturate) {
            if (Number.isInteger(value)) {
                value = value.clamp(Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER)
            }
        }
        if (safe) {
            if (Number.isNaN(value)) {
                return new None()
            }
            if (Number.isInteger(value) && !Number.isSafeInteger(value)) {
                return new None()
            }
        }
        return new Some(value)
    }

    /**
     * @param {any?} value
     * @returns {number}
     */
    function mustNumber(value) {
         if (typeof value == 'number' && !Number.isNaN(value)) {
             return value
         }
         throw new Error(`\`value\` must be a number: \`${value}\``)
    }

    /**
     * @param {any?} value
     * @returns {number}
     */
    function mustInteger(value) {
         if (Number.isInteger(value)) {
             return value
         }
         throw new Error(`\`value\` must be an integer: \`${value}\``)
    }

    /**
     * @param {any?} value
     * @returns {number}
     */
    function mustSafeInteger(value) {
        if (Number.isSafeInteger(value)) {
            return value
        }
        throw new Error(`\`value\` must be a 53-bit integer: \`${value}\``)
    }

    /**
     * @param {string} value
     * @param {number} defaultValue
     * @returns {number}
     */
    function parseFloatOr(value, defaultValue) {
        const result = parseFloat(value)
        return Number.isNaN(result) ? mustNumber(defaultValue) : result
    }

    /**
     * @param {string} value
     * @param {function(): number} orElse
     * @returns {number}
     */
    function parseFloatOrElse(value, orElse) {
        const result = parseFloat(value)
        return Number.isNaN(result) ? mustNumber(orElse()) : result
    }

    /**
     * @param {string} value
     * @param {Object} options
     * @param {boolean?} options.safe
     * @param {boolean?} options.saturate
     * @param {boolean?} options.unsigned
     * @returns {Option<number>}
     */
    function parseFloatOpt(value, { safe, saturate, unsigned } = {}) {
        return expr(parseFloat(value), { safe, saturate, unsigned })
    }

    /**
     * @param {string} value
     * @param {number?} radix
     * @param {number} defaultValue
     * @returns {number}
     */
    function parseIntOr(value, radix, defaultValue) {
        const result = parseInt(value, radix)
        return Number.isNaN(result) ? mustInteger(defaultValue) : result
    }

    /**
     * @param {string} value
     * @param {number?} radix
     * @param {function(): number} orElse
     * @returns {number}
     */
    function parseIntOrElse(value, radix, orElse) {
        const result = parseInt(value, radix)
        return Number.isNaN(result) ? mustInteger(orElse()) : result
    }

    /**
     * @param {string} value
     * @param {number?} radix
     * @param {Object} options
     * @param {boolean?} options.safe
     * @param {boolean?} options.saturate
     * @param {boolean?} options.unsigned
     * @returns {Option<number>}
     */
    function parseIntOpt(value, radix, { safe, saturate, unsigned } = {}) {
        return expr(parseInt(value, radix), { safe, saturate, unsigned })
    }

    /**
     * @param {string} value
     * @param {number?} radix
     * @param {number} defaultValue
     * @returns {number}
     */
    function parseSafeIntOr(value, radix, defaultValue) {
        const result = parseInt(value, radix)
        return Number.isNaN(result) ? mustSafeInteger(defaultValue) : result
    }

    /**
     * @param {string} value
     * @param {number?} radix
     * @param {function(): number} orElse
     * @returns {number}
     */
    function parseSafeIntOrElse(value, radix, orElse) {
        const result = parseInt(value, radix)
        return Number.isNaN(result) ? mustSafeInteger(orElse()) : result
    }

    /**
     * @param {string} value
     * @param {number?} radix
     * @param {Object} options
     * @param {boolean?} options.safe
     * @param {boolean?} options.saturate
     * @param {boolean?} options.unsigned
     * @returns {Option<number>}
     */
    function parseSafeIntOpt(value, radix, { safe, saturate, unsigned } = {}) {
        return expr(parseInt(value, radix), { safe: true, saturate, unsigned })
    }

    /**
     * @returns {number}
     */
    Number.prototype.abs = function () {
        return Math.abs(this)
    }

    /**
     * @param {number}
     * @returns {number}
     */
    Number.prototype.absDiff = function (other) {
        return (this - +other).abs()
    }

    /**
     * @param {number} other
     * @param {boolean?} options.safe
     * @param {boolean?} options.saturate
     * @param {boolean?} options.unsigned
     * @returns {Option<number>}
     */
    Number.prototype.add = function (other, { safe, saturate, unsigned } = {}) {
        return expr(this + +other, { safe, saturate, unsigned })
    }

    /**
     * @param {number} min
     * @param {number} max
     * @returns {number}
     */
    Number.prototype.clamp = function (min, max) {
        return Math.min(Math.max(this, min), max)
    }

    /**
     * @param {any}
     * @returns {number?}
     */
    Number.prototype.compare = function (other) {
        if (typeof other == 'number') {
            const result = this - other
            if (!Number.isNaN(result)) {
                return result
            }
        }
        return null
    }

    /**
     * @param {any} other
     * @param {function(): number} orElse
     */
    Number.prototype.compareThen = function (other, orElse) {
        const result = this.compare(other)
        return result == null || result == 0 ? orElse() : result
    }

    /**
     * @param {number} other
     * @param {boolean?} options.safe
     * @param {boolean?} options.saturate
     * @param {boolean?} options.unsigned
     * @returns {Option<number>}
     */
    Number.prototype.div = function (other, { safe, saturate, unsigned } = {}) {
        return expr(this / +other, { safe, saturate, unsigned })
    }

    /**
     * @param {number[]} others
     * @returns {number}
     */
    Number.prototype.max = function (...others) {
        return Math.max(this, ...others)
    }

    /**
     * @param {number[]} others
     * @returns {number}
     */
    Number.prototype.min = function (...others) {
        return Math.min(this, ...others)
    }

    /**
     * @param {number} other
     * @param {boolean?} options.safe
     * @param {boolean?} options.saturate
     * @param {boolean?} options.unsigned
     * @returns {Option<number>}
     */
    Number.prototype.mod = function (other, { safe, saturate, unsigned } = {}) {
        return expr(this % +other, { safe, saturate, unsigned })
    }

    /**
     * @param {number} other
     * @param {boolean?} options.safe
     * @param {boolean?} options.saturate
     * @param {boolean?} options.unsigned
     * @returns {Option<number>}
     */
    Number.prototype.mul = function (other, { safe, saturate, unsigned } = {}) {
        return expr(this * +other, { safe, saturate, unsigned })
    }

    /**
     * @returns {number}
     */
    Number.prototype.sign = function () {
        return Math.sign(this)
    }

    /**
     * @param {number} other
     * @param {boolean?} options.safe
     * @param {boolean?} options.saturate
     * @param {boolean?} options.unsigned
     * @returns {Option<number>}
     */
    Number.prototype.sub = function (other, { safe, saturate, unsigned } = {}) {
        return expr(this - +other, { safe, saturate, unsigned })
    }

    Object.assign(root, {
        parseFloatOr, parseFloatOrElse, parseFloatOpt,
        parseIntOr, parseIntOrElse, parseIntOpt,
        parseSafeIntOr, parseSafeIntOrElse, parseSafeIntOpt
    })

    root.dispatchEvent(new Event('NumberExtensionsLoaded'))
})(window)
