import { Id } from "./_generated/dataModel";
import { mutation } from "./_generated/server"
export default mutation(async ({ db }, record ) => {
    const {_id, ...rest } = record;
    if (_id) {
        const id = _id as Id<"habits">;
        await db.replace(id, rest);
        return;
    }
    else {
        await db.insert("habits", rest);
    }
});
