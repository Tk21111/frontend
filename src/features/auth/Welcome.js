import {useSelector} from 'react-redux'
import { selectCurrentUser } from './authSlice'
import { Link, useNavigate } from 'react-router-dom'

import React, { useEffect } from 'react'

import useRoleCheck from '../users/role'
import { useGetOMutation } from '../users/usersApiSlice'

const Welcome = () => {
    const user = useSelector(selectCurrentUser)

    const navigate = useNavigate();

    const [getNum , {data , isLoading}] = useGetOMutation()

    const welcome = user? `Welcome ${user}` : 'Welcome!'
    const isAdmin = useRoleCheck('Admin');
    const isEditor = useRoleCheck('Editor');

    useEffect(() => {
        if (!data) {
            const fetch = async () => {
                try {
                    const result = await getNum();
                    if ( isAdmin || isEditor || result.error.status === 405) {
                        return null;
                    } else if (result.data) {
                        navigate('/user');
                    } else {
                        navigate('/usergetnum');
                    }
                } catch(err){
                    console.log(err)
                }
                
            };
            fetch();
        }
    }, []);


    const content = (
        <section className="welcome">
            <h1>{welcome}</h1>
            
            <p><Link to="/usergetnum">Go get your number</Link></p>
            {isEditor ? 
            <>
                <p><Link to="/userslist">Go to the Users List</Link></p>
               
            </> : 
            <p style={{color : 'red'}}> not now</p>
        }
            
            {isAdmin ? 
                <>
                    <h2> For Admin </h2>
                    <p>  To lazy for check role in frontend</p>
                    <p><Link to="/usercheck"> check for a duplicate </Link></p>
                    <p><Link to="/admincmd"> admin give premison</Link></p>
                </>
                 : null
            }
                    
            <h2> Log out idk why u need this lol</h2>
            <p><Link to="/logout"> log out</Link></p>
        </section>
    )

  return content 
}

export default Welcome
