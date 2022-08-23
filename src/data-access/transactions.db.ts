import { Db, ObjectId } from "mongodb";
import connectClient from ".";
import { TransactionEntity } from "../models/transaction.model";

const transactionsDb = {
  insert: async function insert(transaction: TransactionEntity) {
    const client = await connectClient();
    const database: Db = client.db("fizz");
    const collection = database.collection("transactions");

    const result = await collection.insertOne({ ...transaction });
    return result;
  },

  getAll: async function getAll() {
    const client = await connectClient();
    const database: Db = client.db("fizz");
    const collection = database.collection("transactions");

    const transactions = collection.find().toArray();

    return transactions;
  },

  getOutstanding: async function getOutstanding() {
    const client = await connectClient();
    const database: Db = client.db("fizz");
    const collection = database.collection("transactions");

    const transactions = collection.find({ repaid: false }).toArray();
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

  updateById: async function updateById(
    id: string,
    updatedTransaction: TransactionEntity
  ) {
    const client = await connectClient();
    const database: Db = client.db("fizz");
    const collection = database.collection("transactions");

    const updateFilter = {
      _id: new ObjectId(id),
    };

    const updateDocument = {
      $set: { ...updatedTransaction },
    };

    const result = await collection.updateOne(updateFilter, updateDocument);
    return result;
  },

  updateByIds: async function updateByIds(ids: string[], changes: any) {
    const client = await connectClient();
    const database: Db = client.db("fizz");
    const collection = database.collection("transactions");

    const objectIds = ids.map((id) => new ObjectId(id));

    const updateFilter: Object = {
      _id: {
        $in: objectIds,
      },
    };
    const updateDoc: Object = {
      $set: { ...changes },
    };
    const result = await collection.updateMany(updateFilter, updateDoc);
    return result;
  },
};

export default transactionsDb;
