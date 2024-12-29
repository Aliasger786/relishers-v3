import React from 'react'
import { HeroBg } from '../Assets'
import StaticsImages from './Statics'
import { data } from '../../utils/showcaseStatic'
const Right = () => {
  return (
    <div className="py-2 flex-1 flex items-center relative z-50">
      <img src={HeroBg} alt="" className='ml-auto lg:h-[550px] h-[420px] w-full lg:w-auto bg-gradient-to-br from-red-400 to-red-500 rounded-3xl' />
      <StaticsImages items = {data} />
    </div>
  )
}

export default Right