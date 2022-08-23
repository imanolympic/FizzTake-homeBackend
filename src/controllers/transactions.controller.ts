import { Request } from "express";
import {
  addTransaction,
  updateTransaction,
  listTransactions,
} from "../services/transactions.service";

export async function postTransaction(httpRequest: Request) {
  try {
    const transactionInfo = httpRequest.body;

    const result = await addTransaction({ ...transactionInfo });

    return {
      headers: {
        "Content-Type": "application/json",
      },
      statusCode: 200,
      body: { ...result },
    };
  } catch (e: any) {
    console.log(e);

    return {
      headers: {
        "Content-Type": "application/json",
      },
      statusCode: 400,
      body: {
        error: e.message,
      },
    };
  }
}

export async function patchTransaction(httpRequest: Request) {
  try {
    const result = await updateTransaction(httpRequest.body);

    return {
      headers: {
        "Content-Type": "application/json",
      },
      statusCode: 200,
      body: { ...result },
    };
  } catch (e: any) {
    console.log(e);

    return {
      headers: {
        "Content-Type": "application/json",
      },
      statusCode: 400,
      body: {
        error: e.message,
      },
    };
  }
}

export async function getTransactions() {
  try {
    const result = await listTransactions();

    return {
      headers: {
        "Content-Type": "application/json",
      },
      statusCode: 200,
      body: [...result],
    };
  } catch (e: any) {
    console.log(e);

    return {
      headers: {
        "Content-Type": "application/json",
      },
      statusCode: 400,
      body: {
        error: e.message,
      },
    };
  }
}
