import transactionsDb from "../data-access/transactions.db";
import repaymentsDb from "../data-access/repayments.db";
import spendinglimitsDb from "../data-access/spending-limits.db";
import { RepaymentEntity } from "../models/repayment.model";

export async function addRepayment() {
  const outstandingTransactions = await transactionsDb.getOutstanding();
  if (outstandingTransactions.length === 0) {
    throw new Error("No outstanding transactions to be repaid.");
  }

  let amount: number = 0;
  for (const transaction of outstandingTransactions) {
    if (transaction.type === "purchase") {
      amount += transaction.amount;
    } else {
      amount -= transaction.amount;
    }
  }

  let recipient: string;
  if (amount === 0) {
    recipient = "N/A";
  } else if (amount > 0) {
    recipient = "Fizz";
  } else {
    recipient = "User";
  }

  const newRepayment: RepaymentEntity = {
    amount: Math.abs(amount),
    recipient: recipient,
    transactionsCovered: outstandingTransactions.length,
  };
  await repaymentsDb.insert(newRepayment);

  const ids = outstandingTransactions.map((transaction) =>
    transaction._id.toString()
  );
  await transactionsDb.updateByIds(ids, { repaid: true });

  const userId: string = "63041df3537b9ca0b7af9cff";
  await spendinglimitsDb.updateById(userId, { limit: 50 });

  return {
    addCount: 1,
    message: "Repayment successfully added",
  };
}

export async function listRepayments() {
  const repayments = await repaymentsDb.getAll();

  return repayments;
}
