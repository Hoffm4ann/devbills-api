"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupMongo = setupMongo;
const mongoose_1 = __importDefault(require("mongoose"));
async function setupMongo() {
    try {
        if (mongoose_1.default.connection.readyState === 1) {
            return;
        }
        console.log("🎲 connection to DB...");
        const mongoUrl = process.env.MONGO_URL;
        if (!mongoUrl) {
            throw new Error("❌ MONGO_URL is not defined");
        }
        await mongoose_1.default.connect(mongoUrl);
        console.log("DB Connected!");
    }
    catch (error) {
        console.error("❌ Error connecting to DB:", error);
        throw new Error("❌ Error connecting to DB");
    }
}
