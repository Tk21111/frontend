import {useSelector} from 'react-redux'
import { selectCurrentToken , selectCurrentUser } from './authSlice'
import { Link } from 'react-router-dom'

import React from 'react'

const Welcome = () => {
    const user = useSelector(selectCurrentUser)
    const token = useSelector(selectCurrentToken)

    const welcome = user? `Welcome ${user}` : 'Welcome!'
    const tokenAbbr = `${token.slice(0,9)}...`

    const content = (
        <section className="welcome">
            <h1>{welcome}</h1>
            <p>Token: {tokenAbbr}</p>
            <p><Link to="/userslist">Go to the Users List</Link></p>
            <p><Link to="/user" > Go to User </Link></p>
            <p><Link to="/usergetnum" > Go get your number </Link></p>
            <p><Link to="/usergetwho"> Who is your buddy???? </Link></p>
            <p><Link to="/usercheck"> check for a duplicate </Link></p>
        </section>
    )

  return content 
}

export default Welcome