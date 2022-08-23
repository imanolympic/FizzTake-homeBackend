import { Db, ObjectId } from "mongodb";
import connectClient from ".";

const spendinglimitsDb = {
  getById: async function getById(id: string) {
    const client = await connectClient();
    const database: Db = client.db("fizz");
    const collection = database.collection("limits");

    const spendingLimit = (
      await collection.find({ _id: new ObjectId(id) }).toArray()
    ).at(0);
    return spendingLimit;
  },

  updateById: async function updateById(id: string, changes: any) {
    const client = await connectClient();
    const database: Db = client.db("fizz");
    const collection = database.collection("limits");

    const updateFilter = {
      _id: new ObjectId(id),
    };

    const updateDocument = {
      $set: { ...changes },
    };

    const result = await collection.updateOne(updateFilter, updateDocument);
    console.log(result);
    return result;
  },
};

export default spendinglimitsDb;
