import React from 'react'
import { useSelector } from 'react-redux'
import Iconbtn from '../Iconbtn'

const RenderTaotalItem = () => {
  const handleBuyCourse=()=>
  {

  }
  const { total, cart } = useSelector((state) => state.cart);
  return (
    <div>
      <p>Total</p>
      <p>Rs {total}</p>

      <Iconbtn
        text="Buy now"
        onclick={handleBuyCourse}
        classname="w-full justify-center flex"

      />
    </div>
  )
}

export default RenderTaotalItem