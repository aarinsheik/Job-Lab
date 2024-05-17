import React from 'react'

import HomePage from './pages/home_page'
import MainLayout from './layouts/main_layout'
import JobsPage from './pages/jobs_page'
import NotFoundPage from './pages/notFound_page'
import AddJobPage from './pages/AddJob_page'
import EditJobPage from './pages/editJob_page'
import SingleJobPage , {jobLoader}  from './pages/singleJob_page'

import { Route , createBrowserRouter , createRoutesFromElements , RouterProvider } from 'react-router-dom'

const App = () => {

  // Add Job func :
  const addJobsumbit_Func = async ( newJob )=> {
    
    const res = await fetch('/api/jobs' , {
      method : 'POST' ,
      headers: {
        'Content-Type':'application/json'
      } , 
      body: JSON.stringify( newJob )
    } );
    
    return;
  };

  // Delete Job func :
  const delJob_Func = async( jobId )=> {

      const res = await fetch(`/api/jobs/${jobId}` , {
        method:'DELETE' , 
      });
      return;

  };

  // update Job func :
  const updateJobSubmit_Func = async(job) =>{
    const res = await fetch(`/api/jobs/${job.id}`,{
      method:'PUT',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(job),
    })

    return;
  }
  
  const router = createBrowserRouter(
    createRoutesFromElements(

      <Route path='/' element={ <MainLayout/> }>

        <Route index element={ <HomePage/> }/>

        <Route path='/jobs' element={ <JobsPage/> }/>

        <Route path='/jobs/:id' 
          element={ <SingleJobPage delJob={delJob_Func} /> } 
           loader={jobLoader}  />                               {/*  we get jobLoader function from singleJob_page and use it where we need to load the jobs. NOTE : it is not passed as prop instead we use 'useLoaderData' hook to do this */}

        <Route path='/edit-job/:id' 
          element={ <EditJobPage updateJobSubmit={updateJobSubmit_Func} /> } 
          loader={jobLoader}  />                                 {/* here , we pass the jobLoader function to editJob_page, so that we don't have to code again for fetching the data. We can just call this function which is in SingleJob_page using 'useLoaderData' hook */}

        <Route path='/add-job' 
          element={ <AddJobPage addJobSubmit = { addJobsumbit_Func }/> } />

        <Route path='*' element={ <NotFoundPage/> }/>

      </Route>
    )
  );

  return <RouterProvider router={router}/>
}

export default App
