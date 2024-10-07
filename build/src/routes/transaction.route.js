"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transactionsRoutes = void 0;
const express_1 = require("express");
const validator_middleware_1 = require("../middlewares/validator.middleware");
const transactions_dto_1 = require("../dtos/transactions.dto");
const transaction_controller_1 = require("../controllers/transaction.controller");
const transaction_factory_1 = require("../factories/transaction.factory");
exports.transactionsRoutes = (0, express_1.Router)();
const controller = new transaction_controller_1.TransactionsController(transaction_factory_1.TransactionsFactory.getServiceInstance());
exports.transactionsRoutes.post("/", (0, validator_middleware_1.validator)({ schema: transactions_dto_1.createTransactionSchema, type: validator_middleware_1.ParansType.BODY }), controller.create);
exports.transactionsRoutes.get("/", (0, validator_middleware_1.validator)({ schema: transactions_dto_1.getDashboardSchema, type: validator_middleware_1.ParansType.QUERY }), controller.index);
exports.transactionsRoutes.get("/dashboard", (0, validator_middleware_1.validator)({
    schema: transactions_dto_1.getDashboardSchema,
    type: validator_middleware_1.ParansType.QUERY,
}), controller.getDashboard);
exports.transactionsRoutes.get("/dashboard/financial-evolution", (0, validator_middleware_1.validator)({
    schema: transactions_dto_1.getFinancialEvolutionSchema,
    type: validator_middleware_1.ParansType.QUERY,
}), controller.getFinancialEvolution);
