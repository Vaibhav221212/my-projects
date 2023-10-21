import React from 'react'

const formatDate = (dateString) => {
    const options = { year: "numiric", month: "long", day: "numiric" }
    const date = new Date(dateString)
    const formattedDate = date.toLocaleDateString("en-US", options)

    const hour = date.getHours()
    const minutes = date.getMinutes()
    const period = hour >= 12 ? "PM" : "AM"
    const formatDateTime = `${hour % 12}: ${minutes.toString().padStart(2, "0")} ${period}`
    return (
       `${formattedDate} | ${formatDateTime}`
    )
}

export default formatDate