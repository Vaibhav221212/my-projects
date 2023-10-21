import React from 'react'
import Highlighttext from '../Homepage/Highlighttext'

const Quote = () => {
  return (
    <div>
      We are passionate about revolutionizing the way we learn. Our innovative platform
      <Highlighttext text={"combines technology"}/>
      <span className='text-brown-500'>
        {" "}
        expertise
      </span>
      , and community to create an 
      <span  className='text-brown-500'>
      {" "}
        unparalleled educational experience.
      </span>
    </div>
  )
}

export default Quote
