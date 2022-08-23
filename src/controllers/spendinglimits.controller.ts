import { listSpendinglimit } from "../services/spendinglimits.service";

export async function getSpendinglimit() {
  try {
    const result = await listSpendinglimit();

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
