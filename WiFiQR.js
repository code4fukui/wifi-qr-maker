export class WiFiQR {
  static escape(s) {
    s = s.replace(/\\/g, "\\\\");
    s = s.replace(/\;/g, "\\;");
    return s;
  }
  static unescape(s) {
    s = s.replace(/\\;/g, ";");
    s = s.replace(/\\\\/g, "\\");
    return s;
  }
  static encode(ssid, pass) {
    return `WIFI:T:WPA;S:${WiFiQR.escape(ssid)};P:${WiFiQR.escape(pass)};;`;
  }
  static decode(wifi) {
    const parse = (name) => {
      const s = wifi;
      const n = s.indexOf(name + ":");
      if (n < 0) return "";
      let m = -1;
      let n2 = n + name.length + 1;
      for (;;) { // skip escape
        m = s.indexOf(";", n2);
        if (m < 0) return "";
        if (m == 0) break;
        if (s[m - 1] == "\\" && (m > 2 && s[m - 2] != "\\")) {
          n2 = m + 1;
          continue;
        }
        break;
      }
      return WiFiQR.unescape(s.substring(n + name.length + 1, m));
    };
    const ssid = parse("S");
    const pass = parse("P");
    return { ssid, pass };
  }
};
