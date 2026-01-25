"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Page;

var _navigation = require("next/navigation");

function Page() {
  (0, _navigation.redirect)("/qr-generator/url");
}