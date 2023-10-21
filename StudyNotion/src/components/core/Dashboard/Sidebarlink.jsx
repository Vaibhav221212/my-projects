


import React from 'react'
import * as Icons from 'react-icons/vsc'
import { NavLink, matchPath, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
const Sidebarlink = ({ link, iconName }) => {
    const Icon = Icons[iconName]
    const location = useLocation();
    const disoatch = useDispatch()

    const matchRoute = (route) => {
        return matchPath({ path: route }, location.pathname)
    }

    return (
        <NavLink to={link.path}>
           
            <div  className='ml-2 w-[90px]  text-[10px] px-2 py-1 gap-2 md:py-2  rounded-lg hover:bg-white text-white hover:text-black transition-all duration-200 font-semibold flex md:text-[14px] items-center md:gap-x-3 md:w-[170px] md:ml-4'>
                <Icon className="text-lg"></Icon>
                <span className='rounded-lg'>{link.name}</span>
            </div>
        </NavLink>
    )
}

export default Sidebarlink