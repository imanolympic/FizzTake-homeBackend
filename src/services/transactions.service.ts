import createTransaction from "../entities/transaction.entity";
import {
  TransactionEntity,
  TransactionInfo,
} from "../models/transaction.model";
import transactionsDb from "../data-access/transactions.db";
import spendinglimitsDb from "../data-access/spending-limits.db";

export async function addTransaction(transaction: TransactionInfo) {
  const userId: string = "63041df3537b9ca0b7af9cff";
  const spendingLimit = await spendinglimitsDb.getById(userId);
  if (spendingLimit === undefined) {
    throw Error(`Spending limit with id '${userId}' not found`);
  }

  if (
    transaction.type === "purchase" &&
    transaction.amount > spendingLimit.limit
  ) {
    throw Error(`Purchase exceeds spending limit.`);
  }

  const newTransaction = createTransaction({
    ...transaction,
    repaid: false,
    issuedRefund: transaction.type === "purchase" ? false : true,
  });
  await transactionsDb.insert(newTransaction);

  if (transaction.type === "purchase") {
    await spendinglimitsDb.updateById(userId, {
      limit: spendingLimit.limit - transaction.amount,
    });
  } else {
    await spendinglimitsDb.updateById(userId, {
      limit: spendingLimit.limit + transaction.amount,
    });
  }

  return {
    addCount: 1,
    message: "Transaction successfully added",
  };
}

export async function listTransactions() {
  const transactions = await transactionsDb.getAll();

  return transactions;
}

export async function listOutstandingTransactions() {
  const transactions = await transactionsDb.getOutstanding();

  return transactions;
}

export async function updateTransaction({ _id, ...changes }: any) {
  if (_id === undefined) {
    throw new Error("Failed to provide id of object to update");
  }

  if (Object.keys(changes).length === 0) {
    throw new Error(`No changes provided to transaction with id '${_id}'`);
  }

  const existingTransaction = await transactionsDb.getById(_id);
  if (existingTransaction === undefined) {
    throw new Error(`Transaction with id '${_id}' not found`);
  }

  const updatedTransaction: TransactionEntity = createTransaction({
    ...existingTransaction,
    ...changes,
  });

  await transactionsDb.updateById(_id, updatedTransaction);

  return {
    updateCount: 1,
    message: `Transaction with id '${_id}' successfully updated`,
  };
}
