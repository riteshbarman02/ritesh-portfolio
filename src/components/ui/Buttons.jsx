import React from 'react'

const Buttons = ({ label }) => {
  return (
    <div>
      <button className='bg-bg-secondary/10 relative border-amber-50 text-text px-4 py-2 rounded-md border-2 hover:bg-secondary/50 transition duration-100 hover:shadow-[0_0_15px_rgba(255,255,255,0.6)]'>
        {label}
      </button>    
    </div>
  )
}

export default Buttons
