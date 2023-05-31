import { mutation } from "./_generated/server";
import { Doc, Id } from "./_generated/dataModel";
export default mutation(async ({ db }, record ) => {
  const {_id } = record;
  const id = _id as Id<"habits">;
  await db.delete(id);
});
