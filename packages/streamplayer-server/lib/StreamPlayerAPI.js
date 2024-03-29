"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.getNowPlaying = exports.ChannelName = void 0;
var got_1 = require("got");
var icy = require("icy");
var ChannelName;
(function (ChannelName) {
    ChannelName[ChannelName["RADIO2"] = 0] = "RADIO2";
    ChannelName[ChannelName["RADIO3"] = 1] = "RADIO3";
    ChannelName[ChannelName["SKY"] = 2] = "SKY";
    ChannelName[ChannelName["PINGUIN"] = 3] = "PINGUIN";
})(ChannelName = exports.ChannelName || (exports.ChannelName = {}));
var getMetadata = function (name, url) {
    return new Promise(function (resolve) {
        icy.get(url, function (res) {
            var getStaticData = function () {
                var now = Date.now();
                var imageName = name.replace(/\s/g, "-").toLowerCase();
                return {
                    name: name,
                    imageUrl: "/metadata/" + imageName + ".jpg",
                    songImageUrl: "",
                    last_updated: now.toString()
                };
            };
            res.on("metadata", function (metadata) {
                var parsed = icy.parse(metadata);
                var _a = parsed.StreamTitle.split(" - "), artist = _a[0], title = _a[1];
                var staticData = getStaticData();
                resolve(__assign(__assign({}, staticData), { title: title,
                    artist: artist }));
            });
            // Return some values when no metadata within interval
            setTimeout(function () {
                var staticData = getStaticData();
                resolve(__assign(__assign({}, staticData), { title: "[timeout]", artist: "[timeout]" }));
            }, 1000);
        });
    });
};
// Export for use by other apps
exports.getNowPlaying = function (channelName) { return __awaiter(void 0, void 0, void 0, function () {
    var nowonairResponse, _a, artist, title, songImg, enddatetime, broadcastResponse, _b, name_1, presenters, presenterImg, presentersSuffix, nowonairResponse, _c, artist, title, songImg, enddatetime, broadcastResponse, _d, name_2, presenters, presenterImg, presentersSuffix;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                if (!(channelName === ChannelName.RADIO2)) return [3 /*break*/, 3];
                return [4 /*yield*/, got_1["default"]("https://www.nporadio2.nl/api/tracks").json()];
            case 1:
                nowonairResponse = _e.sent();
                _a = nowonairResponse.data[0], artist = _a.artist, title = _a.title, songImg = _a.image_url_400x400, enddatetime = _a.enddatetime;
                return [4 /*yield*/, got_1["default"]("https://www.nporadio2.nl/api/broadcasts").json()];
            case 2:
                broadcastResponse = _e.sent();
                _b = broadcastResponse.data[0], name_1 = _b.title, presenters = _b.presenters, presenterImg = _b.image_url_400x400;
                presentersSuffix = presenters ? " / " + presenters : "";
                return [2 /*return*/, {
                        artist: artist,
                        title: title,
                        last_updated: enddatetime,
                        songImageUrl: songImg !== null && songImg !== void 0 ? songImg : "",
                        name: "" + name_1 + presentersSuffix,
                        imageUrl: presenterImg !== null && presenterImg !== void 0 ? presenterImg : ""
                    }];
            case 3:
                if (!(channelName === ChannelName.RADIO3)) return [3 /*break*/, 6];
                return [4 /*yield*/, got_1["default"]("https://www.npo3fm.nl/api/tracks").json()];
            case 4:
                nowonairResponse = _e.sent();
                _c = nowonairResponse.data[0], artist = _c.artist, title = _c.title, songImg = _c.image_url_400x400, enddatetime = _c.enddatetime;
                return [4 /*yield*/, got_1["default"]("https://www.npo3fm.nl/api/broadcasts").json()];
            case 5:
                broadcastResponse = _e.sent();
                _d = broadcastResponse.data[0], name_2 = _d.title, presenters = _d.presenters, presenterImg = _d.image_url_400x400;
                presentersSuffix = presenters ? " / " + presenters : "";
                return [2 /*return*/, {
                        artist: artist,
                        title: title,
                        last_updated: enddatetime,
                        songImageUrl: songImg !== null && songImg !== void 0 ? songImg : "",
                        name: "" + name_2 + presentersSuffix,
                        imageUrl: presenterImg !== null && presenterImg !== void 0 ? presenterImg : ""
                    }];
            case 6:
                if (channelName === ChannelName.SKY) {
                    // console.log("icy", icy);
                    // console.log("icy.get", icy.get);
                    // return;
                    return [2 /*return*/, getMetadata("Sky Radio", "https://19993.live.streamtheworld.com/SKYRADIO.mp3")];
                }
                if (channelName === ChannelName.PINGUIN) {
                    // return;
                    return [2 /*return*/, getMetadata("Pinguin Radio", "https://streams.pinguinradio.com/PinguinRadio320.mp3")];
                }
                return [2 /*return*/];
        }
    });
}); };
