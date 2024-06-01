import { useEffect } from 'react';
import { useGetOMutation , useGetOuQuery ,useGetUsersQuery} from './usersApiSlice';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentToken, selectCurrentUser } from '../auth/authSlice';

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
    //user === same as database in sever
    // <ul/> === list รวม
    const username = useSelector(selectCurrentUser);
    let content;
    if (isLoading) {
        content = <p>"Loading..."</p>;
    } else if (isSuccess) {
        const filteredUsers = users.filter(user => user.username === username);
        content = (
            <section className="users">
                <h1>Users List</h1>
                <ul>
                    {filteredUsers.map((user, i) => {
                        return <li key={i}>{'username : ' +user.username + 'no : ' + user.no + 'randomnumber : ' + user.randnum}</li>
                    })}
                </ul>
                <Link to="/welcome">Back to Welcome</Link>
            </section>
        )
    } else if (isError) {
        content = <p>{JSON.stringify(error)}</p>;
    }

    return content
}
export default UsersList