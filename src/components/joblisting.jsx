import React from 'react';

//import Jobs from '../jobs.json';                     // we import local json file for data. instead of local ,we load it from backend-server 

import { useState , useEffect} from 'react';         
import Single_joblist from './single_joblist';
import Spinner from '../components/spinner'

const JobListing = ( { isHome=true } ) => {

  // const jobsToShow = isHome ? Jobs.slice(0,3) : Jobs;     //considering only first 3 jobs if isHome=true or all jobs if isHome=false
  
  const [jobsToShow,setjobsToShow] = useState([]);                    // initializing a useState with empty array
  const [loading, setLoading ] = useState(true);

  useEffect( ()=>{   
    
    const fetchJobs = async ()=>{
      
      const apiUrl = isHome                             // if isHome-true we are fetching only 1st three jobs else all jobs
      ? 'api/jobs?_limit=3'                             // fetching using proxy which is created in vite.config.fs
      : 'api/jobs'

      try{

        const res = await fetch(apiUrl);
        const data = await res.json();
        setjobsToShow(data);                                    // we are setting the data we recieved from json (backend-server) to 'jobs' using useState()

      } catch( error ){
        console.log('Error fetching data' , error);
      }
      finally{
           setLoading(false)                            // after fetching data we have to stop the loading animation ,hence we make it false
      }
    }                                                     // we basically can't use async-await function as useEffect function ,instead we create a async-await function inside it 

    fetchJobs()

  } , [] );                                                // it takes a function and a dependency array as argument ( everytime ,when the variable in dependency array changes , the useEffect will run )

  return (
    <section className="bg-blue-50 px-4 py-10">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
          { isHome ? 'Recent Jobs' :' Browse Jobs'}
        </h2>

          { loading ? (                                                       // we are checking whether the data loaded ,if so the loading=false then we show the data else we show the loading spinner
            <Spinner loading={loading}/>
          ) : (           
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              { jobsToShow.map((job) => (                                     // traversing through jobsToShow
              <Single_joblist key={job.id} job={ job }></Single_joblist>      // This is passed using 'probs' to 'Single_joblist' component
              ))}
            </div>
          )}
  
      </div>
    </section>
  );
};

export default JobListing;
