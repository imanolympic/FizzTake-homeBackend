import { Db, ObjectId } from "mongodb";
import connectClient from ".";
import { RepaymentEntity } from "../models/repayment.model";

const repaymentsDb = {
  insert: async function insert(repayment: RepaymentEntity) {
    const client = await connectClient();
    const database: Db = client.db("fizz");
    const collection = database.collection("repayments");

    const result = await collection.insertOne(repayment);
    return result;
  },

  getAll: async function getAll() {
    const client = await connectClient();
    const database: Db = client.db("fizz");
    const collection = database.collection("repayments");

    const transactions = collection.find().toArray();
    return transactions;
  },

  getById: async function getById(id: string) {
    const client = await connectClient();
    const database: Db = client.db("fizz");
    const collection = database.collection("transactions");

    const transaction = (
      await collection.find({ _id: new ObjectId(id) }).toArray()
    ).at(0);
    return transaction;
  },
};

export default repaymentsDb;
