
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
import HabitList from './HabitList';
type Props = {
    author: string
}
const HabitReward = (props:Props) => { 
    const {author} = props;
    const {data, setCurrent,remove, currentId} = useContext(HabitContext);
    const items = (data || []).filter(item => item.creator===author);
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
      <>
      <div className='bg-black w-full font-raleway bg-contain bg-right-bottom bg-no-repeat' style={{backgroundImage: "url(/dark_grey_path-06.png)"}}>
        <h1 className='text-6xl font-bold text-white py-5'>Congratulations {author}!</h1>
        <h2 className='text-3xl font-bold text-white'>On completing Phase2’s Coaching Great Books Course.</h2>
        <img src='./quotes-06.png' className='w-2/12 my-5'/>
        <HabitList {...{author}} />
        <img src='./quotes-06-end.png' className='w-2/12 my-5 ml-auto' />
        <div className='h-12'></div>
      </div>
      
      </>
    )
  }
export default HabitReward;