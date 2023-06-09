import { query } from "./_generated/server";
type Props = { cohort: string };
export default query(async ({ db }, props:Props) => {
  const { cohort } = props;
  return await (await db.query("habits").filter(q => q.eq(q.field("cohort"), cohort as string)).collect()).map(item => ({...item, date:Date.parse(item.date)}));
});