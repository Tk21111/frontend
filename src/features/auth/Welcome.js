import {useSelector} from 'react-redux'
import { selectCurrentUser } from './authSlice'
import { Link } from 'react-router-dom'

import React from 'react'

import useRoleCheck from '../users/role'

const Welcome = () => {
    const user = useSelector(selectCurrentUser)

    const welcome = user? `Welcome ${user}` : 'Welcome!'
    const isAdmin = useRoleCheck('Admin');
    const isEditor = useRoleCheck('Editor');

    console.log(isEditor)
    console.log(isAdmin)

    const content = (
        <section className="welcome">
            <h1>{welcome}</h1>
            {(!isAdmin && !isEditor) ? (
                <>
                    <p><Link to="/user">Your random number</Link></p>
                    <p><Link to="/usergetnum">Go get your number</Link></p>
                    <p style={{ color: 'red' }}>/\ click here /\</p>
                </>
            ) : null}
            
            <h2> After เฉลย </h2>
            {isEditor ? 
            <>
                <p><Link to="/userslist">Go to the Users List</Link></p>
                <p><Link to="/usergetwho"> Who is your buddy???? </Link></p>
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