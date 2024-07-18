import React, { useState } from 'react'
import { toast } from 'react-toastify'        

import user_icon from '../assets/images/person.png'
import email_icon from '../assets/images/email.png'
import password_icon from '../assets/images/password.png'

const loginSignup_page = () => {

    const [ action , setAction ] = useState('signup')                    // state management for signup and login page

    const [ name , setName ] = useState('');
    const [ email , setEmail ] = useState('');
    const [ password , setPassword ] = useState('');

    const title = (action==='signup')?'Sign Up':'Login';

    const nameDiv = (action==='signup')
    ?
    <div className="input flex items-center m-auto w-[480px] h-[70px] bg-[#eaeaea] rounded-[6px]">  
        <img className='mx-[30px]' src={user_icon} alt=""/>
        <input
        required 
        className="h-[40px] w-[400px] bg-transparent border-none outline-none text-[#797979] text-[19px]"
        type='text' 
        name='name' 
        placeholder='Admin Name'
        value = {name}
        onChange={(event) => (setName(event.target.value))}/>
    </div>
    :'';
    
    const signupBtnClass = (action==='signup')
    ?'submit flex justify-center items-center w-[220px] h-[59px] text-white text-xl bg-[#4c00b4] rounded-[50px] font-bold'
    :'submit flex justify-center items-center w-[220px] h-[59px] text-[#605e5e] text-xl bg-[#e5d8f7] rounded-[50px] font-bold';

    const loginBtnClass = (action==='login')
    ?'submit flex justify-center items-center w-[220px] h-[59px] text-white text-xl bg-[#4c00b4] rounded-[50px] font-bold'
    :'submit flex justify-center items-center w-[220px] h-[59px] text-[#605e5e] text-xl bg-[#e5d8f7] rounded-[50px] font-bold';

    function onSubmitSignup(){

        if( action==='signup'){
            
            //perform signup action
            const newUser = {
                name ,
                email , 
                password                           
            }

            //send user details to server oto create an account
            const createUser = async ( newUser )=>{
                const res = await fetch('http://localhost:5000/signup' , {
                    method : 'POST' ,
                    headers: {
                      'Content-Type':'application/json'
                    } , 
                    body: JSON.stringify( {newUser : newUser} )
                  } );
                
                console.log(res)
                return;
            }

            if(newUser.name!='' || newUser.email!='' || newUser.password!=''){
                createUser(newUser)
                toast.success('Signup successfully !');
            }
            else{
                toast.error('Fill the details')
            }

        }
        else{
            setAction('signup')
        }

    }

    function onSubmitLogin(){

        if( action==='login' ){
            
            //perform login action
            const newUser = {
                email , 
                password                           
            }

            //send user details to server oto create an account
            const checkUser = async ( newUser )=>{
                const res = await fetch('http://localhost:5000/login' , {
                    method : 'POST' ,
                    headers: {
                      'Content-Type':'application/json'
                    } , 
                    body: JSON.stringify( {newUser : newUser} )
                  } );
                
                console.log(res)
                return;
            }

            if(newUser.email!='' || newUser.password!=''){
                checkUser(newUser)
                toast.success('Login successfully !');
            }
            else{
                toast.error('Fill the details')
            }


        }
        else{
            setAction('login')
        }

    }

  return (
    <form className=' container flex flex-col h-full px-20 bg-white-50'>
        
        <div className='header flex flex-col items-center gap-2 w-100 mt-7'>
            <div className="text text-[#3c009d] text-[48px] font-bold">{ title }</div>
            <div className="w-[71px] h-[6px] bg-[#3c009d] rounded-[9px]"></div>
        </div>
        <div className="inputs mt-[55px] flex flex-col gap-[25px]">
            
            { nameDiv }

            <div className="input flex items-center m-auto w-[480px] h-[70px] bg-[#eaeaea] rounded-[6px]">
                <img className='mx-[30px]' src={email_icon} alt=""/>
                <input
                required
                className="h-[40px] w-[400px] bg-transparent border-none outline-none text-[#797979] text-[19px]" 
                type='email' 
                name='email' 
                placeholder='Admin Email'
                value = {email}
                onChange={(event) => (setEmail(event.target.value))}/>
            </div> 

            <div className="input flex items-center m-auto w-[480px] h-[70px] bg-[#eaeaea] rounded-[6px]">
                <img className='mx-[30px]' src={password_icon} alt=""/>
                <input
                required 
                className="h-[40px] w-[400px] bg-transparent border-none outline-none text-[#797979] text-[19px]" 
                type='password' 
                name='password' 
                placeholder='Password'
                value = {password}
                onChange={(event) => (setPassword(event.target.value))}/>
            </div>
        </div>
        <div className="submit-container w-full flex justify-center gap-12 my-[50px]">
            <button className={ signupBtnClass } onClick={()=>{ onSubmitSignup() }} >Sign Up</button>
            <button className={ loginBtnClass } onClick={()=>{ onSubmitLogin() }} >Login</button>
        </div>
    </form>
  )
}

export default loginSignup_page
