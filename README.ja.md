# wifi-qr-maker

標準的なWi-Fi QRコードを生成・読み取りするためのシンプルなJavaScriptユーティリティおよびWebインターフェースです。特殊文字の適切な処理に対応しています。

## デモ

[https://code4fukui.github.io/wifi-qr-maker/](https://code4fukui.github.io/wifi-qr-maker/)

## 機能

-   **規格準拠:** Wi-Fiの認証情報（SSIDとパスワード）を標準的な `WIFI:T:WPA;S:...` 形式のQRコードにエンコードします。
-   **正確なエスケープ処理:** SSIDやパスワード内の特殊文字（`;` および `\`）を適切にエスケープし、QRコードスキャナーとの幅広い互換性を確保します。
-   **ライブWebインターフェース:** シンプルなWebページでWi-Fiの認証情報を入力すると、QRコードがリアルタイムで更新されます。
-   **QRコードスキャン:** Webインターフェースからデバイスのカメラを使用して既存のWi-Fi QRコードを読み取り、入力フィールドに自動入力することも可能です。
-   **共有可能なリンク:** SSIDとパスワードはURLハッシュに保存されるため、入力済みのリンクをブックマークしたり共有したりできます。
-   **軽量モジュール:** コアロジックは外部依存関係のないスタンドアロンのESモジュールです。

## 使い方

### Webインターフェースの使用

1.  [デモページ](https://code4fukui.github.io/wifi-qr-maker/)を開きます。
2.  上部の2つの入力フィールドに、ネットワークの**SSID**（ネットワーク名）と**パスワード**を入力します。
3.  QRコードが自動的に生成されます。スマートフォンのカメラでスキャンしてWi-Fiネットワークに接続します。
4.  QRコードを読み取るには、ボタンをクリックしてカメラスキャナーを起動し、Wi-Fi QRコードにかざします。

### JavaScriptモジュールとしての使用

`WiFiQR.js` モジュールをご自身のプロジェクトで直接使用することができます。

```javascript
import { WiFiQR } from "./WiFiQR.js";

// --- エンコード ---
const ssid = "My;Network";
const pass = "p@ss\\word";
const wifiString = WiFiQR.encode(ssid, pass);

console.log(wifiString);
// 出力: "WIFI:T:WPA;S:My\;Network;P:p@ss\\word;;"


// --- デコード ---
const qrData = "WIFI:T:WPA;S:My\\;Network;P:p@ss\\\\word;;";
const credentials = WiFiQR.decode(qrData);

console.log(credentials);
// 出力: { ssid: "My;Network", pass: "p@ss\\word" }
```

## API

### `WiFiQR.encode(ssid, pass)`

-   **`ssid`** `(string)`: SSID（ネットワーク名）。
-   **`pass`** `(string)`: ネットワークのパスワード。
-   **戻り値** `(string)`: QRコードに適した、フォーマットおよびエスケープ済みの `WIFI:` 文字列。

### `WiFiQR.decode(wifiString)`

-   **`wifiString`** `(string)`: Wi-Fi QRコードの生データ。
-   **戻り値** `(object)`: エスケープ解除された認証情報を含む `{ ssid, pass }` オブジェクト。

## 依存関係

`WiFiQR.js` のコアロジックに依存関係はありません。

デモ用のWebインターフェース（`index.html`）では、以下のWebコンポーネントを使用しています。

-   [qr-code](https://github.com/code4fukui/qr-code/): QRコード画像のレンダリング用。
-   [qr-code-reader](https://github.com/code4fukui/qr-code-reader/):
