export type Habit = {
  id: string, 
  when: string, 
  insteadOf: string, 
  will : string,
  _id?: string
};
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
  remove: (habit:Habit) => void;
  get: (id:string) => Habit;
  setCurrentWhen: (id:string) => void;
  setCurrentInstead: (id:string) => void;
  setCurrentWill: (id:string) => void;
  setCurrent: (id?:string) => void;
  
}