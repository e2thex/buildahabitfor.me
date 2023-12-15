import { useContext, useState } from 'react';
import HabitContext from './HabitContext';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import UndoIcon from '@mui/icons-material/Undo';
import copyToClipboard from 'copy-to-clipboard';
import CopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';
import SortIcon from '@mui/icons-material/Sort';

import { v4 } from 'uuid';
const HabitTable = () => { 
    const {data, setCurrent,remove, currentId} = useContext(HabitContext);
    const [copied, setCopied] = useState(false);
    const [sortBy, setSortBy] = useState('date');
    const [sortDirection, setSortDirection] = useState('asc');
    const tableSort = (a:any, b:any) => {
      console.log(sortDirection)
      if (a[sortBy] < b[sortBy]) {
        return sortDirection === 'asc' ? -1 : 1;
      }
      return sortDirection === 'asc' ? 1 : -1;
    }
    const changeSort = (by:string) => {
      if (sortBy === by) {
        setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
      } else {
        setSortBy(by);
      }
    }
    const copy = () => {
      const text = data.map((item) => {
        const {when, insteadOf, will} = item;
        return `When ${when}, instead of ${insteadOf}, I will ${will}. (${item.creator} on ${new Date(item.date).toISOString().slice(0, 10)})`;
      }).join('\n');
      setCopied(true);
      setTimeout(() => { setCopied(false); }, 2000);
      copyToClipboard(text);
    }
    return (
      <table className='w-full'>
        <thead>
          <tr>
            <th className='w-1/4 text-lg p-2 my-2'>When</th>
            <th className='w-1/4 text-lg p-2 my-2'>Instead of</th>
            <th className='w-1/4 text-lg p-2 my-2'>I will</th>
            <th className='w-1/8 text-md p-2 my-2'>
              <div className='w-full' >
                Creator
                <SortIcon className='hover:text-blue-300 cursor-pointer' onClick={(e) =>changeSort('creator')}></SortIcon>
              </div>
              <div className = 'w-full text-sm italic'>
                Date
                <SortIcon className='hover:text-blue-300 cursor-pointer' onClick={(e) => changeSort('date')}></SortIcon>
              </div>
            </th>
            <th className='w-1/8 text-lg p-2 my-2 relative'>
              <div className='relative'>
              <CopyIcon className='hover:text-blue-300 cursor-pointer' onClick={copy}></CopyIcon>
              {copied ? <CheckIcon className="absolute text-green-500"></CheckIcon> : <></>}
              </div>
              </th>
          </tr>
        </thead>
        <tbody>
          {(data || []).sort(tableSort).map((item) => {
            const {id, when, insteadOf, will, creator, date} = item;   
            const dateValue =  new Date(date).toISOString().slice(0, 10);
            return (
              <tr key={id} className={id===currentId ? 'bg-slate-700' :''}>
                <td className='text-lg p-2 my-2 align-top'><span className='font-bold'>When </span>{when}</td>
                <td className='text-lg p-2 my-2 align-top'><span className='font-bold'>Instead </span>Instead of {insteadOf}</td>
                <td className='text-lg p-2 my-2 align-top'><span className='font-bold'>I will </span>I will {will}</td>
                <td className='text-lg p-2 my-2 align-top'><div>{creator}</div> <div className='text-xs italic'> {dateValue}</div></td>
                <td className='text-lg p-2 my-2 align-top'>
                  {id!==currentId ?
                    <>
                      <EditIcon className='hover:text-blue-300 cursor-pointer' onClick={(e) => setCurrent(id)} /> 
                      <DeleteIcon className='hover:text-blue-300 cursor-pointer' onClick={(e) => remove(item)} /> 
                    </>
                    : 
                      <UndoIcon className='hover:text-blue-300 cursor-pointer' onClick={(e) => setCurrent(v4())} /> 
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