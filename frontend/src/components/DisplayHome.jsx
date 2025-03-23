import React from 'react'
import { Navbar } from './Navbar'
import Albumitem from './Albumitem'
import Songitem from './Songitem'
import { useContext } from 'react'
import { PlayerContext } from '../context/PlayerContext'

export const DisplayHome = () => {

  const {songsData, albumsData} = useContext(PlayerContext);

  return (
    <div>
    <Navbar />
    <div className='mb-4'>
      <h1 className='my-5 font-bold text-2xl'>Featured Charts</h1>
      <div className='flex overflow-auto'>
      {albumsData.map((item,index)=>(<Albumitem key={index} name={item.name} desc={item.desc} id={item._id} image={item.image}/>))}
      </div>
    </div>
   
    <div className='mb-4'>
      <h1 className='my-5 font-bold text-2xl'>Todays Biggest Hits</h1>
      <div className='flex overflow-auto'>
        {songsData.map((item,index)=>(<Songitem key={index} name={item.name} desc={item.desc} id={item._id} image={item.image}/>))}
      </div>
    </div>
    </div>
  )
}

