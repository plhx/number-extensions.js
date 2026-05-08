# number-extensions.js

[Number](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Number)オブジェクトに追加の便利メソッドを追加するモジュールです。

## CDNからの利用

```html
<script src="https://js.plasticheart.info/number-extensions/latest/number-extensions.min.js"></script>
```

## 追加定義されるメソッド

### グローバル関数

| 関数 | 説明 |
| --- | --- |
| `parseFloatOr(value, defaultValue)` | 文字列を浮動小数点数にパースし、失敗時は `defaultValue` を返す |
| `parseFloatOrElse(value, orElse)` | 文字列を浮動小数点数にパースし、失敗時は `orElse()` の戻り値を返す |
| `parseIntOr(value, radix, defaultValue)` | 文字列を整数にパースし、失敗時は `defaultValue` を返す |
| `parseIntOrElse(value, radix, orElse)` | 文字列を整数にパースし、失敗時は `orElse()` の戻り値を返す |
| `parseSafeIntOr(value, radix, defaultValue)` | 文字列を安全な整数にパースし、失敗時は `defaultValue` を返す |
| `parseSafeIntOrElse(value, radix, orElse)` | 文字列を安全な整数にパースし、失敗時は `orElse()` の戻り値を返す |

### Number.prototype

| メソッド | 戻り値 | 説明 |
| --- | --- | --- |
| `abs()` | `number` | 絶対値を返す |
| `absDiff(other)` | `number` | 差の絶対値を返す |
| `add(other[, options])` | `?number` | 加算する。`safe` / `saturate` / `unsigned` オプションあり |
| `clamp(min, max)` | `number` | 値を `[min, max]` の範囲に収める |
| `compare(other)` | `?number` | 大小比較の差を返す。比較不能な場合は `null` |
| `compareThen(other, orElse)` | `number` | `compare` が `null` または `0` の場合は `orElse()` の戻り値を返す |
| `div(other[, options])` | `?number` | 除算する。`safe` / `saturate` / `unsigned` オプションあり |
| `max(...others)` | `number` | 最大値を返す |
| `min(...others)` | `number` | 最小値を返す |
| `mod(other[, options])` | `?number` | 剰余を返す。`safe` / `saturate` / `unsigned` オプションあり |
| `mul(other[, options])` | `?number` | 乗算する。`safe` / `saturate` / `unsigned` オプションあり |
| `sign()` | `number` | 符号を返す（`-1` / `0` / `1`） |
| `sub(other[, options])` | `?number` | 減算する。`safe` / `saturate` / `unsigned` オプションあり |

### オプション (`options`)

`add` / `div` / `mod` / `mul` / `sub` の第2引数に指定できます。

| オプション | 説明 |
| --- | --- |
| `safe` | `NaN` または安全な整数範囲外の結果になる場合 `null` を返す |
| `saturate` | 整数オーバーフロー時に `Number.MIN_SAFE_INTEGER` / `Number.MAX_SAFE_INTEGER` にクランプする |
| `unsigned` | 結果が負の場合 `0` にクランプする |
