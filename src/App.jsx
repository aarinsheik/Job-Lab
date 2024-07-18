import React from 'react'

import HomePage from './pages/home_page'
import MainLayout from './layouts/main_layout'
import JobsPage from './pages/jobs_page'
import NotFoundPage from './pages/notFound_page'
import AddJobPage from './pages/AddJob_page'
import EditJobPage from './pages/editJob_page'
import SingleJobPage  from './pages/singleJob_page'
import LoginSignupPage from './pages/loginSignup_page'

import { Route , createBrowserRouter , createRoutesFromElements , RouterProvider, useParams } from 'react-router-dom'

const App = () => {

  // Add Job func :
  const addJobsumbit_Func = async ( newJob )=> {
  
    const res = await fetch('http://localhost:5000/createJob' , {
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
  const { id : jobId } = useParams();

  const updateJobSubmit_Func = async( job ) =>{

    console.log(jobId) 
    console.log(job) 
    const res = await fetch(`http://localhost:5000/editJob/${ job.id }`,{
      method:'PUT',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(job),
    })

    return ;
  }

  //loader :
  const jobLoader = async ( {params} )=>{
      const res = await fetch(`http://localhost:5000/readJob/${params.id}`)
      const data = await res.json();
      return data;
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

        <Route path='/login' element={ <LoginSignupPage/> }></Route>

      </Route>
    )
  );

  return <RouterProvider router={router}/>
}

export default App
