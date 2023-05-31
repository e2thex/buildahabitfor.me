import { query } from "./_generated/server";

export default query(async ({ db }, { cohort }) => {
  return await db.query("habits").filter(q => q.eq(q.field("cohort"), cohort)).collect();
});