"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCategorySchema = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars */
const zod_1 = require("zod");
exports.createCategorySchema = {
    title: zod_1.z.string(),
    color: zod_1.z
        .string()
        .regex(/^#[A-Fa-f0-9]{6}$/, { message: "Invalid color format" }),
};
const createCategoryObject = zod_1.z.object(exports.createCategorySchema);
