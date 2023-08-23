export const configuration = {
    database: {
        name: process.env.DB_USER || "root",
        password: process.env.DB_PASSWORD || "root",
        schema: process.env.DB_TABLE || "nest"
    },
    secret: process.env.SECRET || "hTFI4cbrc0KncvHr"
};