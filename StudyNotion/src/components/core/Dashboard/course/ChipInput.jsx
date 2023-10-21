import React, { useEffect } from 'react'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import { useState } from 'react'
import { MdClose } from 'react-icons/md'

const ChipInput = ({
    label,
    name,
    placeholder,
    register,
    errors,
    setValue,
    getValues,
}) => {
    const { editCourse, course } = useSelector((state) => state.course)
    // Setting up state for managing chips array
    const [chips, setChips] = useState([])

    useEffect(() => {
        if (editCourse) {
            setChips(course?.tag)
        }
        register(name, { required: true, validate: (value) => value.length > 0 })
    }, [])

    useEffect(() => {
        setValue(name, chips)
    }, [chips])


    const handleKeyDown = (e) => {
        if (e.key === "Enter" || e.key === ",") {
            // Prevent the default behavior of the event
            e.preventDefault();
            // Get the input value and remove any leading/trailing spaces
            const chipValue = e.target.value.trim();

            if (chipValue && !chips.includes(chipValue));
            // Add the chip to the array and clear the input

            const newChips = [...chips, chipValue];
            setChips(newChips);
            e.target.value = ""
        }
    }

    // function to handle deletion of chip
    const handleDeleteChip = (chip) => {
        // flter the chips array to rmove the chips with  the given index 
        const newChips = chips.filter((value) => value !== chip)
        setChips(newChips)
    }

    // render the component 
    return (
        <div className='flex flex-col space-y-2'>
            {/* Render the label for the input */}
            <label className="text-sm text-richblack-5" htmlFor={name}>
                {label} <sup className="text-pink-200">*</sup>
            </label>
            <div className="flex w-full flex-wrap gap-y-2">
                {/* Map over the chips array and render each chip */}
                {chips.map((chip, index) => (
                    <div
                        key={index}
                        className="m-1 flex items-center rounded-full bg-yellow-400 px-2 py-1 text-sm text-richblack-5"
                    >
                        {/* Render the chip value */}
                        {chip}
                        {/* Render the button to delete the chip */}
                        <button
                            type="button"
                            className="ml-2 focus:outline-none"
                            onClick={() => handleDeleteChip(chip)}
                        >
                            <MdClose className="text-sm" />
                        </button>
                    </div>
                ))}
                {/* Render the input for adding new chips */}
                <input
                    id={name}
                    name={name}
                    type="text"
                    placeholder={placeholder}
                    onKeyDown={handleKeyDown}
                    className="form-style w-full px-3 py-2 rounded-lg text-white font-semibold outline-none bg-richblue-700"
                />
            </div>
            {/* Render an error message if the input is required and not filled */}
            {errors[name] && (
                <span className="ml-2 text-xs tracking-wide text-pink-200">
                    {label} is required
                </span>
            )}
        </div>
    )
}

export default ChipInput