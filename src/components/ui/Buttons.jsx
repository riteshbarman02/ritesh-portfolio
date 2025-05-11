import React from 'react'

const Buttons = ({label}) => {
  return (
    <div>
        <button className='bg-bg-secondary/10 border-amber-50 text-text px-4 py-2 rounded-md border-2 hover:bg-secondary hover:border-amber-50 hover  transition duration-300'>{label}</button>    
    </div>
  )
}

export default Buttons