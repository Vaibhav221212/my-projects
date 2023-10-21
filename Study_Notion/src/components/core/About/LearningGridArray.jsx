import React from 'react'
import Highlighttext from '../Homepage/Highlighttext'
import CTAButton from '../../../components/core/Homepage/Button'




const LearningGridArray = () => {
    const LearningGridArray = [
        {
            order: -1,
            heading: "World-Class Learning for",
            highlightText: "Anyone, Anywhere",
            description:
                "Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
            BtnText: "Learn More",
            BtnLink: "/",
        },
        {
            order: 1,
            heading: "Curriculum Based on Industry Needs",
            description:
                "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
        },
        {
            order: 2,
            heading: "Our Learning Methods",
            description:
                "Studynotion partners with more than 275+ leading universities and companies to bring",
        },
        {
            order: 3,
            heading: "Certification",
            description:
                "Studynotion partners with more than 275+ leading universities and companies to bring",
        },
        {
            order: 4,
            heading: `Rating "Auto-grading"`,
            description:
                "Studynotion partners with more than 275+ leading universities and companies to bring",
        },
        {
            order: 5,
            heading: "Ready to Work",
            description:
                "Studynotion partners with more than 275+ leading universities and companies to bring",
        },
    ];
    return (
        <div className='grid grid-cols-1 lg:grid-cols-4 mb-10 p-5 lg:w-fit'>

            {
                LearningGridArray.map((card, index) => {
                    return (
                        <div className={`${index == 0 && "lg:col-span-2 lg:h-[10px]"}
                        ${card.order % 2 === 1 ? " bg-richblue-700  " : "bg-richblue-800"}
                        ${card.order === 3 ? "lg:col-start-2" : ""}
                        ${card.order < 0 && "bg-transparent"}
                        mt-2 py-3  lg:h-[230px] rounded-lg`}
                            key={index}>

                            {
                                card.order < 0 ?
                                    (
                                        <div className='lg:w-[80%] font-semibold flex flex-col mt-[-10px] gap-3'>
                                            <div className='text-3xl font-semibold'>
                                                {card.heading}
                                                <Highlighttext text={card.highlightText}></Highlighttext>
                                            </div>
                                            <p className='font-medium'>
                                                {card.description}
                                            </p>
                                            <div className='w-fit mt-2'>
                                                <CTAButton active={true} linkto={card.BtnLink}>
                                                    {card.BtnText}
                                                </CTAButton>
                                            </div>

                                        </div>
                                    ) : (<div className='flex flex-col py-5 px-3 rounded-full'>
                                        <h1 className='text-richblack-5 text-lg'>
                                            {card.heading}
                                        </h1>

                                        <p className='text-richblack-300 font-medium'>
                                            {
                                                card.description
                                            }

                                        </p>

                                    </div>)
                            }
                        </div>
                    )
                })
            }

        </div>
    )
}

export default LearningGridArray