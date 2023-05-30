import { useSearchParams } from 'react-router-dom';
import react, { useState } from 'react';
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
  export default CohortForm;