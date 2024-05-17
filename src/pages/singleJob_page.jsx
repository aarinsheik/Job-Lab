// we are loading the data using a inbuilt react-router feature :

import React from 'react'

import { useParams , useLoaderData, useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { FaArrowLeft , FaMapMarker } from 'react-icons/fa';
import { toast } from 'react-toastify'

const singleJob_page = ( { delJob } ) => {

    const navigate = useNavigate();
    const { id } = useParams();
    const  job = useLoaderData();

    const onClickDelete = (jobId) => {
        
        const confirm =  window.confirm('Are you sure, you want to delete this job-listing ? ')

        if(!confirm){
            return;
        }
        delJob(jobId);       // calling the delJob function which is in App.jsx that is been passed as prop

        toast.success('Job deleted successfully !');  // Displaying a toast msg

        return navigate('/jobs')

    };

    return (
        <>
            <section>
            <div className="container m-auto py-6 px-6">
                <Link
                to="/jobs"
                className="text-indigo-500 hover:text-indigo-600 flex items-center"
                >
                <FaArrowLeft className="fas fa-arrow-left mr-2"></FaArrowLeft   > Back to Job Listings
                </Link>
            </div>
            </section>

            <section className="bg-indigo-50">
            <div className="container m-auto py-10 px-6">
                <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
                <main>
                    <div
                    className="bg-white p-6 rounded-lg shadow-md text-center md:text-left"
                    >
                    <div className="text-gray-500 mb-4">{job.type}</div>
                    <h1 className="text-3xl font-bold mb-4">
                        {job.title}
                    </h1>
                    <div
                        className="text-gray-500 mb-4 flex align-middle justify-center md:justify-start"
                    >
                        <FaMapMarker
                        className="fa-solid fa-location-dot text-lg text-orange-700 mr-2"
                        ></FaMapMarker>
                        <p className="text-orange-700">{ job.location}</p>
                    </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                    <h3 className="text-indigo-800 text-lg font-bold mb-6">
                        Job Description
                    </h3>

                    <p className="mb-4">
                    {job.description}
                    </p>

                    <h3 className="text-indigo-800 text-lg font-bold mb-2">Salary</h3>

                    <p className="mb-4">{job.salary} / Year</p>
                    </div>
                </main>

                {/* <!-- Sidebar --> */}
                <aside>
                    {/* <!-- Company Info --> */}
                    <div className="bg-white p-6 rounded-lg shadow-md" >
                    <h3 className="text-xl font-bold mb-6">Company Info</h3>

                    <h2 className="text-2xl">{job.company.companyName}</h2>

                    <p className="my-2">
                    {job.company.companyDescription}
                    </p>

                    <hr className="my-4" />

                    <h3 className="text-xl">Contact Email:</h3>

                    <p className="my-2 bg-indigo-100 p-2 font-bold">
                       {job.company.contactEmail}
                    </p>

                    <h3 className="text-xl">Contact Phone:</h3>

                    <p className="my-2 bg-indigo-100 p-2 font-bold">{job.company.contactPhone}</p>
                    </div>

                    {/* <!-- Manage --> */}
                    <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                    <h3 className="text-xl font-bold mb-6">Manage Job</h3>
                    <Link
                        to={`/edit-job/${job.id}`}
                        className="bg-indigo-500 hover:bg-indigo-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
                        >Edit Job
                    </Link>
                    <button
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
                        onClick={ ()=>onClickDelete(job.id) }
                    >
                        Delete Job
                    </button>
                    </div>
                </aside>
                </div>
            </div>
            </section>
        </>
    )
};

const jobLoader = async ( {params} )=>{
    const res = await fetch(`/api/jobs/${params.id}`);
    const data = await res.json();
    return data;
}

export { singleJob_page as default , jobLoader };


// or we can load the data using useEffect and useState hooks :

/*
import React from 'react'

import Spinner from '../components/spinner'

import { useEffect , useState } from 'react'
import { useParams } from 'react-router-dom'

const singleJob_page = () => {

    const [job, setJob ] = useState(null);
    const { id } = useParams();
    const [loading , setLoading ] = useState(true);

    useEffect( 
        ()=>{
            const fetchJob = async ()=>{
                
                try{
                    const res = await fetch(`/api/jobs/${id}`);
                    const data = await res.json();
                    setJob(data);
                } catch( er ){
                    console.log('Error fetching data' , er );
                }
                finally{
                    setLoading(false)
                }
            }

            fetchJob()
        }
     , [] )

    return loading ? <Spinner/> : (
        <div><h1>
            { job.title }
        </h1>
        </div>
    )
}

export default singleJob_page
*/
