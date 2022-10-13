"use strict";
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
exports.stopContainer = exports.startContainer = exports.getDockerList = void 0;
var got_1 = require("got");
var pickAndMapContainerProps = function (_a) {
    var Id = _a.Id, Names = _a.Names, State = _a.State, Status = _a.Status;
    return ({ Id: Id, Names: Names, State: State, Status: Status });
};
// Using Docker Engine API: curl --unix-socket /var/run/docker.sock http://v1.24/containers/json?all=true
// These urls also work: http://localhost/v1.24/containers/json?all=true or v1.24/containers/json?all=true
var ROOT_URL = "http://v1.41/containers";
exports.getDockerList = function (args) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, socketPath, result, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = (args !== null && args !== void 0 ? args : {}).socketPath, socketPath = _a === void 0 ? "/var/run/docker.sock" : _a;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, got_1["default"](ROOT_URL + "/json?all=true", {
                        socketPath: socketPath
                    }).json()];
            case 2:
                result = _b.sent();
                return [2 /*return*/, {
                        status: "received",
                        containers: result.map(pickAndMapContainerProps)
                    }];
            case 3:
                err_1 = _b.sent();
                console.error(err_1);
                return [2 /*return*/, {
                        status: "error"
                    }];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.startContainer = function (containerId) { return __awaiter(void 0, void 0, void 0, function () {
    var err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, got_1["default"](ROOT_URL + "/" + containerId + "/start", {
                        method: "POST",
                        socketPath: "/var/run/docker.sock"
                    }).json()];
            case 1:
                _a.sent();
                return [2 /*return*/, {
                        status: "received"
                    }];
            case 2:
                err_2 = _a.sent();
                console.error(err_2);
                return [2 /*return*/, {
                        status: "error"
                    }];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.stopContainer = function (containerId) { return __awaiter(void 0, void 0, void 0, function () {
    var err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, got_1["default"](ROOT_URL + "/" + containerId + "/stop", {
                        method: "POST",
                        socketPath: "/var/run/docker.sock"
                    }).json()];
            case 1:
                _a.sent();
                return [2 /*return*/, {
                        status: "received"
                    }];
            case 2:
                err_3 = _a.sent();
                console.error(err_3);
                return [2 /*return*/, {
                        status: "error"
                    }];
            case 3: return [2 /*return*/];
        }
    });
}); };
