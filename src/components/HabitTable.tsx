import { useContext, useState } from 'react';
import HabitContext from './HabitContext';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import UndoIcon from '@mui/icons-material/Undo';
import copyToClipboard from 'copy-to-clipboard';
import CopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';
import { v4 } from 'uuid';
const HabitTable = () => { 
    const {data, setCurrent,remove, currentId} = useContext(HabitContext);
    const [copied, setCopied] = useState(false);
    const copy = () => {
      const text = data.map((item) => {
        return `When ${item[0]}, instead of ${item[1]}, I will ${item[2]}.`;
      }).join('\n');
      setCopied(true);
      setTimeout(() => { setCopied(false); }, 2000);
      copyToClipboard(text);
    }
    return (
      <table className='w-full'>
        <thead>
          <tr>
            <th className='w-[30%] text-lg p-2 my-2'>When</th>
            <th className='w-[30%] text-lg p-2 my-2'>Instead of</th>
            <th className='w-[30%] text-lg p-2 my-2'>I will</th>
            <th className='w-[10%] text-lg p-2 my-2 relative'>
              <div className='relative'>
              <CopyIcon className='hover:text-blue-300 cursor-pointer' onClick={copy}></CopyIcon>
              {copied ? <CheckIcon className="absolute text-green-500"></CheckIcon> : <></>}
              </div>
              </th>
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
                      <EditIcon className='hover:text-blue-300 cursor-pointer' onClick={(e) => setCurrent(item[3])} /> 
                      <DeleteIcon className='hover:text-blue-300 cursor-pointer' onClick={(e) => remove(item[3])} /> 
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

