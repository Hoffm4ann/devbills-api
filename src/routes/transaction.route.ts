import { Router } from "express";
import { ParansType, validator } from "../middlewares/validator.middleware";
import {
  createTransactionSchema,
  getDashboardSchema,
  getFinancialEvolutionSchema,
} from "../dtos/transactions.dto";
import { TransactionsController } from "../controllers/transaction.controller";
import { TransactionsFactory } from "../factories/transaction.factory";

export const transactionsRoutes = Router();

const controller = new TransactionsController(
  TransactionsFactory.getServiceInstance(),
);

transactionsRoutes.post(
  "/",
  validator({ schema: createTransactionSchema, type: ParansType.BODY }),
  controller.create,
);

transactionsRoutes.get(
  "/",
  validator({ schema: getDashboardSchema, type: ParansType.QUERY }),
  controller.index,
);

transactionsRoutes.get(
  "/dashboard",
  validator({
    schema: getDashboardSchema,
    type: ParansType.QUERY,
  }),
  controller.getDashboard,
);

transactionsRoutes.get(
  "/dashboard/financial-evolution",
  validator({
    schema: getFinancialEvolutionSchema,
    type: ParansType.QUERY,
  }),
  controller.getFinancialEvolution,
);
