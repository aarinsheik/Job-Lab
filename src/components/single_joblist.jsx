import React from 'react'

import { FaMapMarker } from 'react-icons/fa'
import { Link } from 'react-router-dom'

import { useState } from 'react';


const single_joblist = ({job}) => {

    const [showFullDscr , setShowFullDscr ] = useState(false);  // initializing a useState hook

    let dscr = job.description;

    if( !showFullDscr ){
        dscr = dscr.substring( 0, 90) + '...';
    }


  return (
    <div className="bg-white rounded-xl shadow-md relative">
              <div className="p-4">
                <div className="mb-6">
                  <div className="text-gray-600 my-2">{job.type}</div>
                  <h3 className="text-xl font-bold">{job.title}</h3>
                </div>
                <div className="mb-1">{dscr}</div>

                <button onClick={ ()=> setShowFullDscr( (prevState) => !prevState    //here we are using arrow function to switch the state
                )} className="text-indigo-500 mb-5 hover:text-indigo-600">
                     {showFullDscr ? 'Less' : 'More'} 

                </button>

                <h3 className="text-indigo-500 mb-2">{job.salary} / Year</h3>
                <div className="border border-gray-100 mb-5"></div>
                <div className="flex flex-col lg:flex-row justify-between mb-4">
                  <div className="text-orange-700 mb-3">
                    <FaMapMarker className="inline text-lg mb-1 mr-1"></FaMapMarker>
                    <i className="fa-solid fa-location-dot text-lg"></i>
                    {job.location}
                  </div>
                  <Link
                    to={`/jobs/${job._id}`}
                    className="h-[36px] bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-center text-sm"
                  >
                    Know More
                  </Link>
                </div>
              </div>
            </div>

  )
}

export default single_joblist
