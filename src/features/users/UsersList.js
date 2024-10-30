import { useEffect } from 'react';
import { useGetOMutation , useGetOuQuery ,useGetUsersQuery} from './usersApiSlice';
import WhoReU from './UserNoToName';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentToken, selectCurrentUser } from '../auth/authSlice';
import useRoleCheck from './role';

const UsersList = () => {
    const {
        data: users,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetUsersQuery('usersList', {
        pollingInterval: 60000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    const isEditor = useRoleCheck('Editor');
    //user === same as database in sever
    // <ul/> === list รวม
    const username = useSelector(selectCurrentUser);
    let content;
    if (!isEditor){
        content = (
            <>
                <p>wat r u doing</p>
                <Link to="/welcome">Back to Welcome</Link>
            </>
    )
    }
    else if (isLoading) {
        content = <p>"Loading..."</p>;
    } else if (isSuccess) {
        //const filteredUsers = users.filter(user => user.username === username);
        content = (
            <section className="users">
                <h1>Users List</h1>
                <Link to="/welcome">Back to Welcome</Link>
                <ul>
                    {users.map((user, i) => {
                        return (
                        //<li key={i}>{`username : ${user.username}          Name :     ${WhoReU(user.no)}           no :   ${user.no}       randomnumber : ${user.randnum} `}</li>
                        <li key={i}>
                            <div className='llo'>
                                <p>username{" : " + user.username}</p>
                                <p>Name{" : " + WhoReU(user.no)}</p>
                                <p>randomnumber{" : " +user.randnum}</p>
                                <p>Give to {" : " + WhoReU(user.randnum)}</p>
                            </div>
                        </li>
                    )
                    })}
                </ul>
                
            </section>
        )
    } else if (isError) {
        let msg 
        if (error.originalStatus === 401) { msg = "You dont have permission"} else { msg = JSON.stringify(error)}
        content = (
            <section>
                <h1>{msg}</h1>
                <Link to="/welcome">Back to Welcome</Link>
            </section>  
    )
    }

    return content
}
export default UsersList