/* eslint-disable */
/**
 * Generated API.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * Generated by convex@0.14.1.
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type { ApiFromModules } from "convex/api";
import type * as addHabit from "../addHabit";
import type * as delHabit from "../delHabit";
import type * as getHabits from "../getHabits";

/**
 * A type describing your app's public Convex API.
 *
 * This `API` type includes information about the arguments and return
 * types of your app's query and mutation functions.
 *
 * This type should be used with type-parameterized classes like
 * `ConvexReactClient` to create app-specific types.
 */
export type API = ApiFromModules<{
  addHabit: typeof addHabit;
  delHabit: typeof delHabit;
  getHabits: typeof getHabits;
}>;