"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFinancialEvolutionSchema = exports.getDashboardSchema = exports.indexTransactionsSchema = exports.createTransactionSchema = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars */
const zod_1 = require("zod");
const transactions_entity_1 = require("../entities/transactions.entity");
exports.createTransactionSchema = {
    title: zod_1.z.string(),
    amount: zod_1.z.number().int().positive(),
    type: zod_1.z.nativeEnum(transactions_entity_1.TransactionType),
    date: zod_1.z.coerce.date(),
    categoryId: zod_1.z.string().length(24),
};
const createTransactionObject = zod_1.z.object(exports.createTransactionSchema);
exports.indexTransactionsSchema = {
    title: zod_1.z.string().optional(),
    categoryId: zod_1.z.string().length(24).optional(),
    beginDate: zod_1.z.coerce.date().optional(),
    endDate: zod_1.z.coerce.date().optional(),
};
const indexTransactionsObject = zod_1.z.object(exports.indexTransactionsSchema);
exports.getDashboardSchema = {
    beginDate: zod_1.z.coerce.date().optional(),
    endDate: zod_1.z.coerce.date().optional(),
};
const getDashboardObject = zod_1.z.object(exports.getDashboardSchema);
exports.getFinancialEvolutionSchema = {
    year: zod_1.z.string(),
};
const getFinancialEvolutionObject = zod_1.z.object(exports.getFinancialEvolutionSchema);
