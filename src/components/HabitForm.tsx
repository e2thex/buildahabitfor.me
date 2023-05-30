
import React, { useContext } from 'react';
import { HabitData } from './types';
import HabitContext from './HabitContext';
const HabitForm = () => {
    const {data, setCurrent, remove, currentInstead, currentWhen, currentWill, setCurrentInstead, setCurrentWhen, setCurrentWill, add, get} = useContext(HabitContext);
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
  export default HabitForm;