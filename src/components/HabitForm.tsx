
import React, { useContext } from 'react';
import HabitContext from './HabitContext';
import { useSearchParams } from 'react-router-dom';
const HabitForm = () => {
	  const [searchParams] = useSearchParams();
		const cohort = searchParams.get('r');
    const {data, setCurrent, remove, currentInstead, currentWhen, currentWill, setCurrentInstead, setCurrentWhen, setCurrentWill, add, get, currentCreator, setCurrentCreator} = useContext(HabitContext);
    const inputRef = React.useRef<HTMLInputElement>(null);
    const submit = (e:React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      add();
      setCurrent();
      inputRef.current?.focus();
    }  
		const setCurrentCreatorIntersept = (creator:string) => {
			localStorage.setItem('creator', creator);
			setCurrentCreator(creator);
		}
    return (
			<section>
				<h1 className='text-5xl text-center m-5'>Build a Habit for Me!</h1>
				<h2 className='text-2xl text-center m-5'>{cohort}</h2>
				<div className='text-center mb-5 italic'>
					<p>Use this form to add a new habit formula or edit an existing one.</p>
					<p>The formula is based on one presented in the book The Coaching Habit.</p>
				</div>
				<form className='flex flex-wrap' onSubmit={submit}>
					<div className='w-1/6 text-lg p-2 my-2'>Creator</div>
					<input ref={inputRef} className='border my-2 w-5/6 p-2  border-gray-600 placeholder-gray-600 text-lg' placeholder='This is your name' type="text" name="when" value={currentCreator} onChange={(e) => setCurrentCreatorIntersept(e.target.value)} />
					<div className='w-1/6 text-lg p-2 my-2'>When</div>
					<input ref={inputRef} className='border my-2 w-5/6 p-2  border-gray-600 placeholder-gray-600 text-lg' placeholder='I start my 1 on 1' type="text" name="when" value={currentWhen} onChange={(e) => setCurrentWhen(e.target.value)} />
					<div className='w-1/6 text-lg p-2 my-2'>Instead of</div>
					<input className='border my-2 w-5/6 p-2  border-gray-600 placeholder-gray-600 text-lg' placeholder='ask how my report is doing' type="text" name="instead" value={currentInstead} onChange={(e) => setCurrentInstead(e.target.value)} />
					<div className='w-1/6 text-lg p-2 my-2'>I will</div>
					<input className='border my-2 w-5/6 p-2  border-gray-600 placeholder-gray-600 text-lg' placeholder='ask what is on your mind' type="text" name="will" value={currentWill} onChange={(e) => setCurrentWill(e.target.value)} />
					<input type="submit" value="Submit" className='w-full text-lg border  p-2 bg-blue-300 hover:bg-blue-500 hover:text-white'/>
			  </form>
		  </section>

  
    )
  }
  export default HabitForm;