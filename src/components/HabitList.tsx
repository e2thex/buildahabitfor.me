
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
type Props = {
    author: string
    includeDate?:Boolean
}
const HabitList = (props:Props) => { 
    const {author, includeDate} = props;
    const {data, setCurrent,remove, currentId} = useContext(HabitContext);
    const items = (data || []).filter(item => item.creator===author).sort((a, b) => a.date > b.date ? 1 :-1);
    return (
      <>
        <img src='./startquote.png' className='w-[70px] my-5'/>
        <div className="my-6 flex flex-wrap">

          {(items || []).map((item) => {
            const {id, when, insteadOf, will, creator, date} = item;   
            const dateValue =  new Date(date).toISOString().slice(0, 10);
            return (
              <div key={id} className='w-full md:w-1/2 my-5 pr-10'>
                When {when}, instead of {insteadOf},
                <span className="font-bold text-p2blue text-xl"> I will {will}</span>
                {includeDate ? <div className='font-italic text-md text-gray-700'>{dateValue}</div> : <></> }
                </div>
            )
          
            })}
        </div>
        <img src='./endquote.png' className='float-right w-[70px] my-5' />
      </>
    )
  }
export default HabitList;