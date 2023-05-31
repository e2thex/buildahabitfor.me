import { createContext } from 'react';
import { v4 } from 'uuid';
import { useState } from 'react';
import { useMutation, useQuery } from '../../convex/_generated/react';

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
const HabitContext = createContext({} as HabitData);

const useConvexHabitContextController = (cohort:string) => {
  const tasks = useQuery("getHabits", {cohort}) as unknown as Habit[];
  const addTask = useMutation("addHabit");
  const delHabit = useMutation("delHabit");
  console.log(tasks);
  let [data, setData] = useState([] as Habit[]);
  let [currentWhen, setCurrentWhen] = useState('');
  let [currentInstead, setCurrentInstead] = useState('');
  let [currentWill, setCurrentWill] = useState('');
  let [currentId, setCurrentId] = useState(v4());
  let [current_id, setCurrent_id] = useState('' as string);
  const get = (id:string) =>{
      return (tasks || []).find((item) => item.id === id) ||  {when:'', insteadOf:'', will:'', id };
  };
  const controller = {
    data:tasks,
    currentWhen,
    currentInstead,
    currentWill,
    currentId,
    setCurrentWhen,
    setCurrentInstead,
    setCurrentWill,
    add: (itemIn?:Habit) => {
      const item = itemIn || [currentWhen, currentInstead, currentWill, currentId];
      console.log({id:currentId, when:currentWhen, insteadOf:currentInstead, will:currentWill});
      addTask({id:currentId, when:currentWhen, insteadOf:currentInstead, will:currentWill, cohort, _id:current_id});
    },
    remove: (record:Habit) => {
      delHabit(record);
    },
    get,
    setCurrent: (id?:string) => {
      console.log({id})
      const {when, insteadOf, will, _id} = typeof id !=='undefined' ? get(id) : {when:'', insteadOf:'', will:'', _id:null}
      console.log({when, insteadOf, will, _id});
      setCurrentWhen(when);
      setCurrentInstead(insteadOf);
      setCurrentWill(will);
      setCurrentId(id || v4());
      setCurrent_id((_id || ''));
    },
  }
  return controller as HabitData;
}

export default HabitContext;
export {useConvexHabitContextController};