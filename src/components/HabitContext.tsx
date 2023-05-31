import { createContext } from 'react';
import { HabitData } from './types';
import { v4 } from 'uuid';
import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import { Habit } from './types';
import { HabitDictionary } from './types';
import { useMutation, useQuery } from '../../convex/_generated/react';

const HabitContext = createContext({} as HabitData);

const useHabitContextControler = (cohort:string) => {
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
  let [habitId, setHabitId] = useState('');
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
      /*
      setData(Object.values(
        { 
          ...data.reduce((acc, cur) => {acc[cur[3]] = cur; return acc}, {} as HabitDictionary), 
          [item[3]]: item
        }));
        */
    },
    get,
    setId: (id:string) => {  
      setHabitId(id);
    },
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
    remove: (record:Habit) => {
      delHabit(record);
      //setData(data.filter((item) => item[3] !== id));
    }
  }
  return controller as HabitData;
}

export default HabitContext;
export {useHabitContextControler};