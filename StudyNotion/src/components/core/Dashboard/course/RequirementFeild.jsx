import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'

const RequirementFeild = ({ name, label, register, errors, setValue, getValues }) => {

  const [requirement, setRequirement] = useState([])
  const [requirementList, setRequirementList] = useState([]);


  useEffect(() => {
    register(name, { required: true })
  }, [])

  useEffect(() => {
    setValue(name, requirementList);

  }, [requirementList])


  const handlerAddRequirement = () => {
    if (requirement) {
      setRequirementList([...requirementList, requirement])
    }
  }


  const handleRemoveRequirement = (index) => {
    const updateRequiremtnList = [...requirementList]
    updateRequiremtnList.splice(index, 1);
    setRequirementList(updateRequiremtnList);
  }
  return (
    <div className='text-black relative'>
      <label htmlFor={name}>enter tags</label>
      <div>
        <input type='text' id={name}
          value={requirement}
          onChange={(e) => setRequirement(e.target.value)}
          className='w-full'
        >
        </input>
        <button type='button'
          onClick={handlerAddRequirement}
          className='font-semibold text-yellow-50'>
          Add
        </button>
      </div>


      {
        requirementList.map((require, index) =>
        (
          <li key={index} className='gap-3 flex items-center text-richblue-50'>
            <span>{require}</span>

            <button type='button' className='text-white'
              onClick={() => handleRemoveRequirement(index)}>

              clear

            </button>

          </li>
        ))
      }

      {
        errors[name] &&
        (<span>{label} is required</span>)
      }
    </div>
  )
}

export default RequirementFeild