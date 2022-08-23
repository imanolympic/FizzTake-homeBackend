import spendinglimitsDb from "../data-access/spending-limits.db";

export async function listSpendinglimit() {
  const userId: string = "63041df3537b9ca0b7af9cff";
  const limit = await spendinglimitsDb.getById(userId);

  return limit;
}
