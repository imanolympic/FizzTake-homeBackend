import { addRepayment, listRepayments } from "../services/repayments.service";

export async function postRepayment() {
  try {
    const result = await addRepayment();

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

export async function getRepayments() {
  try {
    const result = await listRepayments();

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
