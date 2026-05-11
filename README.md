# wifi-qr-maker

> 日本語のREADMEはこちらです: [README.ja.md](README.ja.md)

A simple JavaScript utility and web interface to generate and read standard Wi-Fi QR codes, with correct handling for special characters.

## Demo

[https://code4fukui.github.io/wifi-qr-maker/](https://code4fukui.github.io/wifi-qr-maker/)

## Features

-   **Standard Compliant:** Encodes Wi-Fi credentials (SSID and password) into the standard `WIFI:T:WPA;S:...` QR code format.
-   **Correct Escaping:** Properly escapes special characters (`;` and `\`) in the SSID and password to ensure broad compatibility with QR code scanners.
-   **Live Web Interface:** A simple web page allows you to type your Wi-Fi credentials and see the QR code update in real-time.
-   **QR Code Scanning:** The web interface can also use your device's camera to read an existing Wi-Fi QR code and populate the fields.
-   **Shareable Links:** The SSID and password are saved in the URL hash, allowing you to bookmark or share a pre-filled link.
-   **Lightweight Module:** The core logic is a standalone ES module with no external dependencies.

## Usage

### Using the Web Interface

1.  Open the [demo page](https://code4fukui.github.io/wifi-qr-maker/).
2.  Enter your network's **SSID** (name) and **password** into the top two input fields.
3.  The QR code will be generated automatically. Scan it with your phone's camera to connect to the Wi-Fi network.
4.  To read a QR code, click the button to activate the camera scanner, and point it at a Wi-Fi QR code.

### As a JavaScript Module

You can use the `WiFiQR.js` module directly in your own projects.

```javascript
import { WiFiQR } from "./WiFiQR.js";

// --- Encoding ---
const ssid = "My;Network";
const pass = "p@ss\\word";
const wifiString = WiFiQR.encode(ssid, pass);

console.log(wifiString);
// Output: "WIFI:T:WPA;S:My\;Network;P:p@ss\\word;;"


// --- Decoding ---
const qrData = "WIFI:T:WPA;S:My\\;Network;P:p@ss\\\\word;;";
const credentials = WiFiQR.decode(qrData);

console.log(credentials);
// Output: { ssid: "My;Network", pass: "p@ss\\word" }
```

## API

### `WiFiQR.encode(ssid, pass)`

-   **`ssid`** `(string)`: The SSID (network name).
-   **`pass`** `(string)`: The network password.
-   **Returns** `(string)`: A formatted and escaped `WIFI:` string suitable for a QR code.

### `WiFiQR.decode(wifiString)`

-   **`wifiString`** `(string)`: The raw data from a Wi-Fi QR code.
-   **Returns** `(object)`: An object `{ ssid, pass }` with the unescaped credentials.

## Dependencies

The core logic in `WiFiQR.js` has no dependencies.

The demo web interface (`index.html`) utilizes the following Web Components:

-   [qr-code](https://github.com/code4fukui/qr-code/): For rendering the QR code image.
-   [qr-code-reader](https://github.com/code4fukui/qr-code-reader/):