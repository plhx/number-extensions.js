/**
 * @file number-extensions.test.js
 * @copyright 2026 PlasticHeart
 */

!(() => {
    /**
     * @param {T} a
     * @param {T} b
     * @returns {boolean}
     */
    function equals(a, b) {
        if (a === b) {
            return true
        } else if (typeof a == 'number' && typeof b == 'number') {
            return Number.isNaN(a) && Number.isNaN(b) || a == b
        } else if (typeof a == 'bigint' && typeof b == 'bigint') {
            return a == b
        } else if (typeof a?.equals == 'function') {
            return a.equals(b)
        } else if (typeof a?.compare == 'function') {
            return a.compare(b) == 0
        }
        return false
    }

    /**
     * @param {string} testName
     * @param {function()} action
     */
    function test(testName, action) {
        try {
            action()
            console.debug(`[UnitTest] ${testName}: OK`)
        } catch (e) {
            console.warn(`[UnitTest] ${testName}: ${e}`)
            throw e
        }
    }

    /**
     * @param {T} a
     * @param {T} b
     */
    function assertEq(a, b) {
        const result = equals(a, b)
        if (!result) {
            console.assert(result, `assertion failed: ${a} != ${b}`)
            throw new Error(`assertion failed: ${a} != ${b}`)
        }
    }

    /**
     * @param {function(): T} action
     * @param {Object} options
     * @param {Error} options.error
     */
    function assertExc(action, { error } = {}) {
        try {
            action()
            console.assert(false, `assertion failed: no error was thrown`)
            throw new Error(`assertion failed: no error was thrown`)
        } catch (e) {
            if (error && !(e instanceof error)) {
                console.assert(false, `assertion failed: expected error of type \`${error}\`, but caught \`${e}\` instead`)
                throw new Error(`assertion failed: expected error of type \`${error}\`, but caught \`${e}\` instead`)
            }
        }
    }

    test('::parseFloatOr()', () => {
        assertEq(parseFloatOr('abc', 42), 42)
        assertEq(parseFloatOr('10', 42), 10)
        assertEq(parseFloatOr('123.45', 0), 123.45)
        assertEq(parseFloatOr('0xdeadbeef', 42), 0)
        assertEq(parseFloatOr('NaN', 42), 42)
        assertEq(parseFloatOr('Infinity', 42), Infinity)
    })

    test('::parseFloatOrElse()', () => {
        assertEq(parseFloatOrElse('abc', () => 42), 42)
        assertEq(parseFloatOrElse('10', () => 42), 10)
        assertEq(parseFloatOrElse('123.45', () => 42), 123.45)
        assertEq(parseFloatOrElse('NaN', () => 42), 42)
        assertEq(parseFloatOrElse('0xdeadbeef', () => 42), 0)
        assertEq(parseFloatOrElse('Infinity', () => 42), Infinity)
    })

    test('::parseFloatOpt()', () => {
        assertEq(parseFloatOpt('abc'), new Some(NaN))
        assertEq(parseFloatOpt('abc', { safe: true }), new None())
        assertEq(parseFloatOpt('-24.72'), new Some(-24.72))
        assertEq(parseFloatOpt('-24.72.', { unsigned: true }), new Some(0))
        assertEq(parseFloatOpt('10000000000000000'), new Some(1e16))
        assertEq(parseFloatOpt('10000000000000000', { safe: true }), new None())
        assertEq(parseFloatOpt('10000000000000000', { saturate: true }), new Some(Math.pow(2, 53) - 1))
        assertEq(parseFloatOpt('Infinity'), new Some(Infinity))
        assertEq(parseFloatOpt('Infinity', { saturate: true }), new Some(Infinity))
    })

    test('::parseIntOr()', () => {
        assertEq(parseIntOr('abc', null, 42), 42)
        assertEq(parseIntOr('42', null, 42), 42)
        assertEq(parseIntOr('123.45', null, 42), 123)
        assertEq(parseIntOr('0xdeadbeef', null, 42), 0xdeadbeef)
        assertEq(parseIntOr('NaN', null, 42), 42)
        assertEq(parseIntOr('Infinity', null, 42), 42)

        assertEq(parseIntOr('10', 2, 42), 2)
        assertEq(parseIntOr('10', 8, 42), 8)
        assertEq(parseIntOr('10', 10, 42), 10)
        assertEq(parseIntOr('10', 16, 42), 16)
    })

    test('::parseIntOrElse()', () => {
        assertEq(parseIntOrElse('abc', null, () => 42), 42)
        assertEq(parseIntOrElse('42', null, () => 42), 42)
        assertEq(parseIntOrElse('123.45', null, () => 42), 123)
        assertEq(parseIntOrElse('0xdeadbeef', null, () => 42), 0xdeadbeef)
        assertEq(parseIntOrElse('NaN', null, () => 42), 42)
        assertEq(parseIntOrElse('Infinity', null, () => 42), 42)

        assertEq(parseIntOrElse('10', 2, () => 42), 2)
        assertEq(parseIntOrElse('10', 8, () => 42), 8)
        assertEq(parseIntOrElse('10', 10, () => 42), 10)
        assertEq(parseIntOrElse('10', 16, () => 42), 16)
    })

    test('::parseIntOpt()', () => {
        assertEq(parseIntOpt('abc'), new Some(NaN))
        assertEq(parseIntOpt('abc', null, { safe: true }), new None())
        assertEq(parseIntOpt('-24.72'), new Some(-24))
        assertEq(parseIntOpt('-24.72.', null, { unsigned: true }), new Some(0))
        assertEq(parseIntOpt('10000000000000000'), new Some(1e16))
        assertEq(parseIntOpt('10000000000000000', null, { safe: true }), new None())
        assertEq(parseIntOpt('10000000000000000', null, { saturate: true }), new Some(Number.MAX_SAFE_INTEGER))
        assertEq(parseIntOpt('Infinity'), new Some(NaN))
        assertEq(parseIntOpt('10', 2), new Some(2))
        assertEq(parseIntOpt('10', 8), new Some(8))
        assertEq(parseIntOpt('10', 16), new Some(16))
    })

    test('::parseSafeIntOpt()', () => {
        assertEq(parseSafeIntOpt('abc'), new None())
        assertEq(parseSafeIntOpt('-24.72'), new Some(-24))
        assertEq(parseSafeIntOpt('-24.72.', null, { unsigned: true }), new Some(0))
        assertEq(parseSafeIntOpt('10000000000000000'), new None())
        assertEq(parseSafeIntOpt('10000000000000000', null, { saturate: true }), new Some(Number.MAX_SAFE_INTEGER))
        assertEq(parseSafeIntOpt('Infinity'), new None())
        assertEq(parseSafeIntOpt('10', 2), new Some(2))
        assertEq(parseSafeIntOpt('10', 8), new Some(8))
        assertEq(parseSafeIntOpt('10', 16), new Some(16))
    })

    test('Number::abs()', () => {
        assertEq((2).abs(), 2)
        assertEq((-5).abs(), 5)
        assertEq((-Infinity).abs(), Infinity)
        assertEq((NaN).abs(), NaN)
    })

    test('Number::absDiff()', () => {
        assertEq((2).absDiff(5), 3)
        assertEq((-2).absDiff(5), 7)
        assertEq((2).absDiff(-5), 7)
        assertEq((-2).absDiff(-5), 3)
    })

    test('Number::add()', () => {
        assertEq((2).add(3), new Some(5))
        assertEq((2).add(Number.MAX_SAFE_INTEGER), new Some(Number.MAX_SAFE_INTEGER + 2))
        assertEq((2).add(Number.MAX_SAFE_INTEGER, { safe: true }), new None())
        assertEq((2).add(Number.MAX_SAFE_INTEGER, { saturate: true }), new Some(Number.MAX_SAFE_INTEGER))
        assertEq((2).add(Number.MAX_SAFE_INTEGER, { unsigned: true }), new Some(Number.MAX_SAFE_INTEGER + 2))
        assertEq((-10).add(-20), new Some(-30))
        assertEq((-10).add(-20, { unsigned: true }), new Some(0))
        assertEq((2).add(NaN), new Some(NaN))
        assertEq((2).add(NaN, { safe: true }), new None())
        assertEq((2).add(NaN, { saturate: true }), new Some(NaN))
        assertEq((2).add(NaN, { unsigned: true }), new Some(NaN))
    })

    test('Number::clamp()', () => {
        assertEq((2).clamp(5, 10), 5)
        assertEq((7).clamp(5, 10), 7)
        assertEq((15).clamp(5, 10), 10)
    })

    test('Number::compare()', () => {
        assertEq((2).compare(5) < 0, true)
        assertEq((2).compare(-8) > 0, true)
        assertEq((2).compare(2) == 0, true)
        assertEq((2).compare(NaN), null)
    })

    test('Number::compareThen()', () => {
        assertEq((2).compareThen(5, () => 5) < 0, true)
        assertEq((7).compareThen(5, () => 5) > 0, true)
        assertEq((5).compareThen(5, () => -1) < 0 , true)
    })

    test('Number::div()', () => {
        assertEq((2).div(3), new Some(2 / 3))
        assertEq((0).div(0), new Some(NaN))
        assertEq((0).div(0, { safe: true }), new None())
    })

    test('Number::max()', () => {
        assertEq((2).max(3), 3)
        assertEq((2).max(3, 4, 5), 5)
        assertEq((2).max(NaN), NaN)
    })

    test('Number::min()', () => {
        assertEq((2).min(3), 2)
        assertEq((2).min(3, 4, 5), 2)
        assertEq((2).min(NaN), NaN)
    })

    test('Number::mod()', () => {
        assertEq((2).mod(3), new Some(2))
        assertEq((0).mod(0), new Some(NaN))
        assertEq((0).mod(0, { safe: true }), new None())
    })

    test('Number::mul()', () => {
        assertEq((2).mul(3), new Some(6))
        assertEq((0).mul(NaN), new Some(NaN))
        assertEq((0).mul(NaN, { safe: true }), new None())
        assertEq((2).mul(-5, { unsigned: true }), new Some(0))
        assertEq((2).mul(Number.MAX_SAFE_INTEGER, { saturate: true }), new Some(Number.MAX_SAFE_INTEGER))
        assertEq((2).mul(Infinity, { saturate: true }), new Some(Infinity))
    })

    test('Number::sign()', () => {
        assertEq((-2).sign(), -1)
        assertEq((0).sign(), 0)
        assertEq((5).sign(), 1)
        assertEq((Infinity).sign(), 1)
        assertEq((-Infinity).sign(), -1)
        assertEq((NaN).sign(), NaN)
    })

    test('Number::sub()', () => {
        assertEq((-2).sub(3), new Some(-5))
        assertEq(Number.MIN_SAFE_INTEGER.sub(2), new Some(Number.MIN_SAFE_INTEGER - 2))
        assertEq(Number.MIN_SAFE_INTEGER.sub(2, { safe: true }), new None())
        assertEq(Number.MIN_SAFE_INTEGER.sub(2, { saturate: true }), new Some(Number.MIN_SAFE_INTEGER))
        assertEq(Number.MIN_SAFE_INTEGER.sub(2, { unsigned: true }), new Some(0))
        assertEq((10).sub(-20), new Some(30))
        assertEq((10).sub(-20, { unsigned: true }), new Some(30))
        assertEq((2).sub(NaN), new Some(NaN))
        assertEq((2).sub(NaN, { safe: true }), new None())
        assertEq((2).sub(NaN, { saturate: true }), new Some(NaN))
        assertEq((2).sub(NaN, { unsigned: true }), new Some(NaN))
    })
})()
