"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configuration = void 0;
exports.configuration = {
    database: {
        name: process.env.DB_USER || "root",
        password: process.env.DB_PASSWORD || "root",
        schema: process.env.DB_TABLE || "nest"
    },
    secret: process.env.SECRET || "hTFI4cbrc0KncvHr"
};
//# sourceMappingURL=configuration.js.map