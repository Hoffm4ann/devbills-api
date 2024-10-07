/* eslint-disable prefer-const */
import { CategoriesRepository } from "../database/repositories/categories.repository";
import { TransactionsRepository } from "../database/repositories/transactions.repository";
import {
  CreateTransactionDTO,
  GetDashboardDTO,
  GetFinancialEvolutionDTO,
  IndexTransactionDTO,
} from "../dtos/transactions.dto";
import { Balance } from "../entities/balance.entity";
import { Expense } from "../entities/expense.entity";
import { Transaction } from "../entities/transactions.entity";
import { AppError } from "../errors/app.error";
import { StatusCodes } from "http-status-codes";

export class TransactionsService {
  constructor(
    private transactionsRepository: TransactionsRepository,
    private categoriesRepository: CategoriesRepository,
  ) {}

  async create({
    title,
    date,
    amount,
    type,
    categoryId,
  }: CreateTransactionDTO): Promise<Transaction> {
    const category = await this.categoriesRepository.findById(categoryId);
    if (!category) {
      throw new AppError("Category not found!", StatusCodes.NOT_FOUND);
    }

    const transaction = new Transaction({
      title,
      date,
      amount,
      type,
      category,
    });

    const createdTransaction =
      await this.transactionsRepository.create(transaction);

    return createdTransaction;
  }
  async index(filters: IndexTransactionDTO): Promise<Transaction[]> {
    const transactions = await this.transactionsRepository.index(filters);

    return transactions;
  }
  async getDashboard({
    beginDate,
    endDate,
  }: GetDashboardDTO): Promise<{ balance: Balance; expenses: Expense[] }> {
    let [balance, expenses] = await Promise.all([
      this.transactionsRepository.getBalance({
        beginDate,
        endDate,
      }),
      this.transactionsRepository.getExpenses({
        beginDate,
        endDate,
      }),
    ]);

    if (!balance) {
      balance = new Balance({
        _id: null,
        incomes: 0,
        expenses: 0,
        balance: 0,
      });
    }
    return { balance, expenses };
  }
  async getFinancialEvolution({
    year,
  }: GetFinancialEvolutionDTO): Promise<Balance[]> {
    const financialEvolution =
      await this.transactionsRepository.getFinancialEvolution({ year });

    return financialEvolution;
  }
}