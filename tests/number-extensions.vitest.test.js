/**
 * @file number-extensions.vitest.test.js
 * @copyright 2026 PlasticHeart
 */

import { describe, test, expect } from 'vitest'
import '../src/number-extensions.js'

describe('::parseFloatOr()', () => {
    test('001 - NaN文字列にdefaultValueを返す', () => {
        expect(parseFloatOr('abc', 42)).toBe(42)
        expect(parseFloatOr('NaN', 42)).toBe(42)
    })

    test('002 - 有効な数値文字列をパースする', () => {
        expect(parseFloatOr('10', 42)).toBe(10)
        expect(parseFloatOr('123.45', 0)).toBe(123.45)
        expect(parseFloatOr('Infinity', 42)).toBe(Infinity)
    })

    test('003 - 0xプレフィックスは0としてパースされる', () => {
        expect(parseFloatOr('0xdeadbeef', 42)).toBe(0)
    })
})

describe('::parseFloatOrElse()', () => {
    test('001 - NaN文字列にorElseの戻り値を返す', () => {
        expect(parseFloatOrElse('abc', () => 42)).toBe(42)
        expect(parseFloatOrElse('NaN', () => 42)).toBe(42)
    })

    test('002 - 有効な数値文字列をパースする', () => {
        expect(parseFloatOrElse('10', () => 42)).toBe(10)
        expect(parseFloatOrElse('123.45', () => 42)).toBe(123.45)
        expect(parseFloatOrElse('Infinity', () => 42)).toBe(Infinity)
    })

    test('003 - 0xプレフィックスは0としてパースされる', () => {
        expect(parseFloatOrElse('0xdeadbeef', () => 42)).toBe(0)
    })
})

describe('::parseIntOr()', () => {
    test('001 - NaN文字列にdefaultValueを返す', () => {
        expect(parseIntOr('abc', null, 42)).toBe(42)
        expect(parseIntOr('NaN', null, 42)).toBe(42)
        expect(parseIntOr('Infinity', null, 42)).toBe(42)
    })

    test('002 - 有効な整数文字列をパースする', () => {
        expect(parseIntOr('42', null, 0)).toBe(42)
        expect(parseIntOr('123.45', null, 0)).toBe(123)
        expect(parseIntOr('0xdeadbeef', null, 0)).toBe(0xdeadbeef)
    })

    test('003 - radixを指定してパースする', () => {
        expect(parseIntOr('10', 2, 0)).toBe(2)
        expect(parseIntOr('10', 8, 0)).toBe(8)
        expect(parseIntOr('10', 10, 0)).toBe(10)
        expect(parseIntOr('10', 16, 0)).toBe(16)
    })
})

describe('::parseIntOrElse()', () => {
    test('001 - NaN文字列にorElseの戻り値を返す', () => {
        expect(parseIntOrElse('abc', null, () => 42)).toBe(42)
        expect(parseIntOrElse('NaN', null, () => 42)).toBe(42)
        expect(parseIntOrElse('Infinity', null, () => 42)).toBe(42)
    })

    test('002 - 有効な整数文字列をパースする', () => {
        expect(parseIntOrElse('42', null, () => 0)).toBe(42)
        expect(parseIntOrElse('123.45', null, () => 0)).toBe(123)
        expect(parseIntOrElse('0xdeadbeef', null, () => 0)).toBe(0xdeadbeef)
    })

    test('003 - radixを指定してパースする', () => {
        expect(parseIntOrElse('10', 2, () => 0)).toBe(2)
        expect(parseIntOrElse('10', 8, () => 0)).toBe(8)
        expect(parseIntOrElse('10', 10, () => 0)).toBe(10)
        expect(parseIntOrElse('10', 16, () => 0)).toBe(16)
    })
})

describe('::parseSafeIntOr()', () => {
    test('001 - NaN文字列にdefaultValueを返す', () => {
        expect(parseSafeIntOr('abc', null, 42)).toBe(42)
        expect(parseSafeIntOr('NaN', null, 42)).toBe(42)
        expect(parseSafeIntOr('Infinity', null, 42)).toBe(42)
    })

    test('002 - 有効な整数文字列をパースする', () => {
        expect(parseSafeIntOr('42', null, 0)).toBe(42)
        expect(parseSafeIntOr('123.45', null, 0)).toBe(123)
    })

    test('003 - radixを指定してパースする', () => {
        expect(parseSafeIntOr('10', 2, 0)).toBe(2)
        expect(parseSafeIntOr('10', 8, 0)).toBe(8)
        expect(parseSafeIntOr('10', 10, 0)).toBe(10)
        expect(parseSafeIntOr('10', 16, 0)).toBe(16)
    })
})

describe('::parseSafeIntOrElse()', () => {
    test('001 - NaN文字列にorElseの戻り値を返す', () => {
        expect(parseSafeIntOrElse('abc', null, () => 42)).toBe(42)
        expect(parseSafeIntOrElse('NaN', null, () => 42)).toBe(42)
        expect(parseSafeIntOrElse('Infinity', null, () => 42)).toBe(42)
    })

    test('002 - 有効な整数文字列をパースする', () => {
        expect(parseSafeIntOrElse('42', null, () => 0)).toBe(42)
        expect(parseSafeIntOrElse('123.45', null, () => 0)).toBe(123)
    })

    test('003 - radixを指定してパースする', () => {
        expect(parseSafeIntOrElse('10', 2, () => 0)).toBe(2)
        expect(parseSafeIntOrElse('10', 8, () => 0)).toBe(8)
        expect(parseSafeIntOrElse('10', 10, () => 0)).toBe(10)
        expect(parseSafeIntOrElse('10', 16, () => 0)).toBe(16)
    })
})

describe('Number::abs()', () => {
    test('001 - 絶対値を返す', () => {
        expect((2).abs()).toBe(2)
        expect((-5).abs()).toBe(5)
        expect((-Infinity).abs()).toBe(Infinity)
        expect((NaN).abs()).toBeNaN()
    })
})

describe('Number::absDiff()', () => {
    test('001 - 差の絶対値を返す', () => {
        expect((2).absDiff(5)).toBe(3)
        expect((-2).absDiff(5)).toBe(7)
        expect((2).absDiff(-5)).toBe(7)
        expect((-2).absDiff(-5)).toBe(3)
    })
})

describe('Number::add()', () => {
    test('001 - 通常の加算', () => {
        expect((2).add(3)).toBe(5)
        expect((-10).add(-20)).toBe(-30)
    })

    test('002 - safe: true でオーバーフロー時にnullを返す', () => {
        expect((2).add(Number.MAX_SAFE_INTEGER, { safe: true })).toBeNull()
        expect((2).add(NaN, { safe: true })).toBeNull()
    })

    test('003 - saturate: true でMAX_SAFE_INTEGERにクランプする', () => {
        expect((2).add(Number.MAX_SAFE_INTEGER, { saturate: true })).toBe(Number.MAX_SAFE_INTEGER)
    })

    test('004 - unsigned: true で負数を0にクランプする', () => {
        expect((-10).add(-20, { unsigned: true })).toBe(0)
    })

    test('005 - NaN伝播', () => {
        expect((2).add(NaN)).toBeNaN()
    })
})

describe('Number::clamp()', () => {
    test('001 - 範囲内に収める', () => {
        expect((2).clamp(5, 10)).toBe(5)
        expect((7).clamp(5, 10)).toBe(7)
        expect((15).clamp(5, 10)).toBe(10)
    })
})

describe('Number::compare()', () => {
    test('001 - 大小比較の符号を返す', () => {
        expect((2).compare(5) < 0).toBe(true)
        expect((2).compare(-8) > 0).toBe(true)
        expect((2).compare(2) == 0).toBe(true)
    })

    test('002 - NaNとの比較はnullを返す', () => {
        expect((2).compare(NaN)).toBeNull()
    })
})

describe('Number::compareThen()', () => {
    test('001 - 不等の場合は差を返す', () => {
        expect((2).compareThen(5, () => 5) < 0).toBe(true)
        expect((7).compareThen(5, () => 5) > 0).toBe(true)
    })

    test('002 - 等しい場合はorElseの戻り値を返す', () => {
        expect((5).compareThen(5, () => -1) < 0).toBe(true)
    })
})

describe('Number::div()', () => {
    test('001 - 通常の除算', () => {
        expect((2).div(3)).toBeCloseTo(2 / 3)
    })

    test('002 - 0÷0はNaN', () => {
        expect((0).div(0)).toBeNaN()
    })

    test('003 - safe: true で0÷0はnullを返す', () => {
        expect((0).div(0, { safe: true })).toBeNull()
    })
})

describe('Number::max()', () => {
    test('001 - 最大値を返す', () => {
        expect((2).max(3)).toBe(3)
        expect((2).max(3, 4, 5)).toBe(5)
        expect((2).max(NaN)).toBeNaN()
    })
})

describe('Number::min()', () => {
    test('001 - 最小値を返す', () => {
        expect((2).min(3)).toBe(2)
        expect((2).min(3, 4, 5)).toBe(2)
        expect((2).min(NaN)).toBeNaN()
    })
})

describe('Number::mod()', () => {
    test('001 - 通常の剰余', () => {
        expect((2).mod(3)).toBe(2)
    })

    test('002 - 0÷0はNaN', () => {
        expect((0).mod(0)).toBeNaN()
    })

    test('003 - safe: true で0÷0はnullを返す', () => {
        expect((0).mod(0, { safe: true })).toBeNull()
    })
})

describe('Number::mul()', () => {
    test('001 - 通常の乗算', () => {
        expect((2).mul(3)).toBe(6)
    })

    test('002 - safe: true でNaN時にnullを返す', () => {
        expect((0).mul(NaN, { safe: true })).toBeNull()
    })

    test('003 - unsigned: true で負数を0にクランプする', () => {
        expect((2).mul(-5, { unsigned: true })).toBe(0)
    })

    test('004 - saturate: true でMAX_SAFE_INTEGERにクランプする', () => {
        expect((2).mul(Number.MAX_SAFE_INTEGER, { saturate: true })).toBe(Number.MAX_SAFE_INTEGER)
        expect((2).mul(Infinity, { saturate: true })).toBe(Infinity)
    })
})

describe('Number::sign()', () => {
    test('001 - 符号を返す', () => {
        expect((-2).sign()).toBe(-1)
        expect((0).sign()).toBe(0)
        expect((5).sign()).toBe(1)
        expect((Infinity).sign()).toBe(1)
        expect((-Infinity).sign()).toBe(-1)
        expect((NaN).sign()).toBeNaN()
    })
})

describe('Number::sub()', () => {
    test('001 - 通常の減算', () => {
        expect((-2).sub(3)).toBe(-5)
        expect((10).sub(-20)).toBe(30)
    })

    test('002 - safe: true でオーバーフロー時にnullを返す', () => {
        expect(Number.MIN_SAFE_INTEGER.sub(2, { safe: true })).toBeNull()
        expect((2).sub(NaN, { safe: true })).toBeNull()
    })

    test('003 - saturate: true でMIN_SAFE_INTEGERにクランプする', () => {
        expect(Number.MIN_SAFE_INTEGER.sub(2, { saturate: true })).toBe(Number.MIN_SAFE_INTEGER)
    })

    test('004 - unsigned: true で負数を0にクランプする', () => {
        expect(Number.MIN_SAFE_INTEGER.sub(2, { unsigned: true })).toBe(0)
    })
})
