import { createContext } from 'react';
import { HabitData } from './types';
import { v4 } from 'uuid';
import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import { Habit } from './types';
import { HabitDictionary } from './types';

const HabitContext = createContext({} as HabitData);

const useHabitContextControler = () => {
  let [data, setData] = useState([] as Habit[]);
  let [currentWhen, setCurrentWhen] = useState('');
  let [currentInstead, setCurrentInstead] = useState('');
  let [currentWill, setCurrentWill] = useState('');
  let [currentId, setCurrentId] = useState(v4());
  let [habitId, setHabitId] = useState('');
  const controller = {
    data,
    currentWhen,
    currentInstead,
    currentWill,
    currentId,
    setCurrentWhen,
    setCurrentInstead,
    setCurrentWill,
    add: (itemIn?:Habit) => {
      const item = itemIn || [currentWhen, currentInstead, currentWill, currentId];
      setData(Object.values(
        { 
          ...data.reduce((acc, cur) => {acc[cur[3]] = cur; return acc}, {} as HabitDictionary), 
          [item[3]]: item
        }));
    },
    get: (id:string) => {
      return data.find((item) => item[3] === id) || ['','','', id];
    },
    setId: (id:string) => {  
      setHabitId(id);
    },
    setCurrent: (id?:string) => {
      const [when, instead, will] = id ? get(id) : ['','',''];
      setCurrentWhen(when);
      setCurrentInstead(instead);
      setCurrentWill(will);
      setCurrentId(id || v4());
    },
    remove: (id:string) => {
      setData(data.filter((item) => item[3] !== id));
    }
  }
  return controller as HabitData;
}

export default HabitContext;
export {useHabitContextControler};