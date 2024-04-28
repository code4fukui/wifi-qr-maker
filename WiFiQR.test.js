import { WiFiQR } from "./WiFiQR.js";
import * as t from "https://deno.land/std/testing/asserts.ts";

Deno.test("simple", () => {
  t.assertEquals(WiFiQR.encode("a", "b"), "WIFI:T:WPA;S:a;P:b;;");
});
Deno.test("escape ;", () => {
  t.assertEquals(WiFiQR.encode("a", "b;"), "WIFI:T:WPA;S:a;P:b\\;;;");
  t.assertEquals(WiFiQR.decode("WIFI:T:WPA;S:a;P:b\\;;;"), { ssid: "a", pass: "b;" });
});
Deno.test("escape \\", () => {
  t.assertEquals(WiFiQR.encode("a", "b;\\"), "WIFI:T:WPA;S:a;P:b\\;\\\\;;");
  t.assertEquals(WiFiQR.decode("WIFI:T:WPA;S:a;P:b\\;\\\\;;"), { ssid: "a", pass: "b;\\" });
  t.assertEquals(WiFiQR.encode("a", "b\\"), "WIFI:T:WPA;S:a;P:b\\\\;;");
  t.assertEquals(WiFiQR.decode("WIFI:T:WPA;S:a;P:b\\\\;;"), { ssid: "a", pass: "b\\" });
});
