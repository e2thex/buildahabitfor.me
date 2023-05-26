'use client'
import Image from 'next/image'
import React, { Suspense, useContext, createContext, useState } from 'react';
import { v4 } from 'uuid';
import { BrowserRouter as Router, useLocation, useParams, useSearchParams } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import UndoIcon from '@mui/icons-material/Undo';
import { NoSsr } from '@mui/base';
type Habit =[ string, string, string, string];
type HabitDictionary = {
  [key: string]: Habit;
}
type HabitFormulaData = {
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
type WorkingIdContextType = [string, (id:string) => void];
const HabitFormulasContext = createContext({} as HabitFormulaData);
const WorkingIdContext = createContext([] as unknown as WorkingIdContextType);
const CohortForm = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const r = searchParams.get('r');
  const [value, setValue] = useState(r || '');

  return (
    <form  onSubmit={(e) => setSearchParams({r: value})}>
      <input className='text-center border w-5/6 p-2  border-gray-600 placeholder-gray-600 text-lg' placeholder='Enter Cohort Name' type="text" name="r" onChange={(e) => setValue(e.target.value)} />
      <input type="submit" value="Submit" className='w-1/6 text-lg border  p-2 bg-blue-300 hover:bg-blue-500 hover:text-white'/>
    </form>
  )
}
const HabitTable = () => { 
  const {data, setCurrent,remove, currentId} = useContext(HabitFormulasContext);
  const [habitId, setHabitId] = useContext(WorkingIdContext);
  return (
    <table className='w-full'>
      <thead>
        <tr>
          <th className='w-[30%] text-lg p-2 my-2'>When</th>
          <th className='w-[30%] text-lg p-2 my-2'>Instead of</th>
          <th className='w-[30%] text-lg p-2 my-2'>I will</th>
          <th className='w-[10%] text-lg p-2 my-2'></th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => {   
          return (
            <tr key={item[3]} className={item[3]===currentId ? 'bg-slate-200' :''}>
              <td className='text-lg p-2 my-2 align-top'><span className='font-bold'>When </span>{item[0]}</td>
              <td className='text-lg p-2 my-2 align-top'><span className='font-bold'>Instead </span>Instead of {item[1]}</td>
              <td className='text-lg p-2 my-2 align-top'><span className='font-bold'>I will </span>I will {item[2]}</td>
              <td className='text-lg p-2 my-2 align-top'>
                {item[3]!==currentId ?
                  <>
                    <EditIcon className='cursor-pointer' onClick={(e) => setCurrent(item[3])} /> 
                    <DeleteIcon className='cursor-pointer' onClick={(e) => remove(item[3])} /> 
                  </>
                  : 
                    <UndoIcon className='cursor-pointer' onClick={(e) => setCurrent(v4())} /> 
                 }
                </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
const HabitForm = () => {
  const {data, setCurrent, remove, currentInstead, currentWhen, currentWill, setCurrentInstead, setCurrentWhen, setCurrentWill, add, get} = useContext(HabitFormulasContext);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const submit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    add();
    setCurrent();
    inputRef.current?.focus();
  }  
  return (
    <form className='flex flex-wrap' onSubmit={submit}>
    <div className='w-1/6 text-lg p-2 my-2'>When</div>
    <input ref={inputRef} className='border my-2 w-5/6 p-2  border-gray-600 placeholder-gray-600 text-lg' placeholder='I start my 1 on 1' type="text" name="when" value={currentWhen} onChange={(e) => setCurrentWhen(e.target.value)} />
    <div className='w-1/6 text-lg p-2 my-2'>Instead of</div>
    <input className='border my-2 w-5/6 p-2  border-gray-600 placeholder-gray-600 text-lg' placeholder='ask how my report is doing' type="text" name="instead" value={currentInstead} onChange={(e) => setCurrentInstead(e.target.value)} />
    <div className='w-1/6 text-lg p-2 my-2'>I will</div>
    <input className='border my-2 w-5/6 p-2  border-gray-600 placeholder-gray-600 text-lg' placeholder='ask what is on your mind' type="text" name="will" value={currentWill} onChange={(e) => setCurrentWill(e.target.value)} />
    <input type="submit" value="Submit" className='w-full text-lg border  p-2 bg-blue-300 hover:bg-blue-500 hover:text-white'/>

    </form>

  )
}
const Inner = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  let [data, setData] = useState([] as Habit[]);
  let [currentWhen, setCurrentWhen] = useState('');
  let [currentInstead, setCurrentInstead] = useState('');
  let [currentWill, setCurrentWill] = useState('');
  let [currentId, setCurrentId] = useState(v4());
  let [habitId, setHabitId] = useState('');
  const r = searchParams.get('r');
  if (!r) {
    return <CohortForm />;
  } 
  const add = (itemIn?:Habit) => {
    const item = itemIn || [currentWhen, currentInstead, currentWill, currentId];
    setData(Object.values(
      { 
        ...data.reduce((acc, cur) => {acc[cur[3]] = cur; return acc}, {} as HabitDictionary), 
        [item[3]]: item
      }));
  }
  const get = (id:string) => {
    return data.find((item) => item[3] === id) || ['','','', id];
  }
  const setId = (id:string) => {  
    setHabitId(id);
  }
  const setCurrentFromId = (id?:string) => {
    const [when, instead, will] = id ? get(id) : ['','',''];
    setCurrentWhen(when);
    setCurrentInstead(instead);
    setCurrentWill(will);
    setCurrentId(id || v4());
  }
  const remove = (id:string) => {
    setData(data.filter((item) => item[3] !== id));
  }
  return (
    <div>

      <HabitFormulasContext.Provider value={{data ,currentWhen, remove, currentInstead, currentWill, currentId, add, get,setCurrentWhen, setCurrentInstead, setCurrentWill, setCurrent:setCurrentFromId}}>
        <WorkingIdContext.Provider value={[habitId, setId]}>
        <HabitForm />
        <HabitTable />
        </WorkingIdContext.Provider>
      </HabitFormulasContext.Provider>
    </div>
  );

};
const Home = () => {
  return (
        <NoSsr>


    <Router>
      <div className="container max-w-2xl mx-auto">
          <Inner />
        </div>
    </Router>
        </NoSsr>
  );
};
export default Home;
/*
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Get started by editing&nbsp;
          <code className="font-mono font-bold">src/app/page.tsx</code>
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{' '}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className="dark:invert"
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>

      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px]">
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>

      <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-4 lg:text-left">
        <a
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Docs{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Find in-depth information about Next.js features and API.
          </p>
        </a>

        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800 hover:dark:bg-opacity-30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Learn{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Learn about Next.js in an interactive course with&nbsp;quizzes!
          </p>
        </a>

        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Templates{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Explore the Next.js 13 playground.
          </p>
        </a>

        <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Deploy{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Instantly deploy your Next.js site to a shareable URL with Vercel.
          </p>
        </a>
      </div>
    </main>
  )
}
*/