import { createContext } from 'react';
import { v4 } from 'uuid';
import { useState } from 'react';
// import { useMutation, useQuery } from '../../convex/_generated/react';
import { useQuery, useMutation } from "convex/react";

export type Habit = {
  id: string, 
  when: string, 
  insteadOf: string, 
  will : string,
  creator : string,
  date: Date,
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
  currentCreator: string;
  currentDate: Date;
  currentId: string;
  add: (item?:Habit) => void;
  remove: (habit:Habit) => void;
  get: (id:string) => Habit;
  setCurrentWhen: (id:string) => void;
  setCurrentInstead: (id:string) => void;
  setCurrentWill: (id:string) => void;
  setCurrent: (id?:string) => void;
  setCurrentCreator: (creator:string) => void;
  setCurrentDate: (date:Date) => void;
  
}
const HabitContext = createContext({} as HabitData);

const useConvexHabitContextController = (cohort:string) => {
  const tasks = useQuery("getHabits", {cohort}) as unknown as (Habit & {_id:any} )[] ;
  const addTask = useMutation("addHabit");
  const delHabit = useMutation("delHabit");
  console.log(tasks);
  let [data, setData] = useState([] as Habit[]);
  let [currentWhen, setCurrentWhen] = useState('');
  let [currentInstead, setCurrentInstead] = useState('');
  let [currentWill, setCurrentWill] = useState('');
  let [currentId, setCurrentId] = useState(v4());
  let [currentCreator, setCurrentCreator] = useState(localStorage.getItem('creator') || '');
  let [currentDate, setCurrentDate] = useState(new Date());
  let [current_id, setCurrent_id] = useState('' as string);
  const get = (id:string) =>{
      return (tasks || []).find((item) => item.id === id) ||  {when:'', insteadOf:'', will:'', id, creator:localStorage.getItem('creator')|| '', _id:null, date:new Date() };
  };
  const controller = {
    data:tasks,
    currentWhen,
    currentInstead,
    currentWill,
    currentId,
    currentCreator,
    currentDate,
    setCurrentWhen,
    setCurrentInstead,
    setCurrentWill,
    setCurrentCreator,
    setCurrentDate,
    add: (itemIn?:Habit) => {
      const item = itemIn || {when:currentWhen, insteadOf:currentInstead, will:currentWill, id:currentId, creator:currentCreator, date:currentDate, _id:current_id} as Habit;
      console.log({item});
      console.log({item, a:{...item, date:new Date(item.date).toISOString()}});
      
      addTask({...item, date:new Date(item.date).toISOString(), cohort});
    },
    remove: (record:Habit) => {
      delHabit(record);
    },
    get,
    setCurrent: (id?:string) => {
      console.log({id})
      const creatorDefault = localStorage.getItem('creator') || '';
      const {when, insteadOf, will, _id, creator, date} = typeof id !=='undefined' ? get(id) : {when:'', insteadOf:'', will:'', _id:null, creator:creatorDefault, date:new Date()}
      console.log({when, insteadOf, will, _id});
      setCurrentWhen(when);
      setCurrentInstead(insteadOf);
      setCurrentWill(will);
      setCurrentId(id || v4());
      setCurrent_id((_id || ''));
      setCurrentCreator(creator);
      setCurrentDate(date);
    },
  }
  return controller as HabitData;
}

export default HabitContext;
export {useConvexHabitContextController};