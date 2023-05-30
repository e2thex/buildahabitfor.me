export type Habit =[ string, string, string, string];
export type HabitDictionary = {
  [key: string]: Habit;
}
export type HabitData = {
  data: Habit[];
  currentWhen: string;
  currentInstead: string;
  currentWill: string;
  currentId: string;
  add: (item?:Habit) => void;
  remove: (id:string) => void;
  get: (id:string) => Habit;
  setCurrentWhen: (id:string) => void;
  setCurrentInstead: (id:string) => void;
  setCurrentWill: (id:string) => void;
  setCurrent: (id?:string) => void;
  
}