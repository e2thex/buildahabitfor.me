import { useContext } from 'react';
import { HabitData } from './types';
import HabitContext from './HabitContext';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import UndoIcon from '@mui/icons-material/Undo';
import { v4 } from 'uuid';
const HabitTable = () => { 
    const {data, setCurrent,remove, currentId} = useContext(HabitContext);
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
export default HabitTable;