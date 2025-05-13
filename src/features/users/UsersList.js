import { useEffect, useState } from 'react';
import { useGetOMutation, useGetOuQuery, useGetUsersQuery } from './usersApiSlice';
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
    });

    const [search, setSearch] = useState(null);

    const isEditor = useRoleCheck('Editor');
    const username = useSelector(selectCurrentUser);

    let content;

    if (!isEditor) {
        content = (
            <>
                <p>wat r u doing</p>
                <Link to="/welcome">Back to Welcome</Link>
            </>
        );
    } else if (isLoading) {
        content = <p>"Loading..."</p>;
    } else if (isSuccess) {
        let contentList = users;

        if (search !== null && search !== '') {
            const searchNumber = parseInt(search, 10);
            contentList = users.filter((obj) => obj['no'] === searchNumber || obj['randnum'] === searchNumber);
        }

        content = (
            <div className="flex flex-col justify-center align-middle text-center mt-[2%] ">
                <h1>Users List</h1>
                <Link to="/welcome">Back to Welcome</Link>
                <input 
                    value={search || ''} 
                    onChange={(e) => setSearch(e.target.value)}
                    id="search"
                    placeholder="Search..."
                    type="number"
                    className='text-black my-[5%]'
                />
                <div className='grid grid-cols-1 sm:grid-cols-5 gap-2 '>
                    {contentList.map((user, i) => (
                        <li key={i} className='flex justify-center h-30 min-w-full rounded-sm border-2 m-1'>
                            <div className="text-center ">
                                <p>user: {user.username}</p>
                                <p>Name: {WhoReU(user.no)?.split(" ")[0]}</p>
                                <p>No: {user.no}</p>
                                <div className='flex flex-row justify-around '>
                                    <p>Get : {WhoReU(user.get)?.split(" ")[0]}</p>
                                    <p>Give : {WhoReU(user.randnum)?.split(" ")[0]}</p>
                                </div>
                            </div>
                        </li>
                    ))}
                </div>
            </div>
        );
    } else if (isError) {
        const errorMsg = error.originalStatus === 401 
            ? "You don't have permission" 
            : JSON.stringify(error);
            
        content = (
            <section>
                <h1>{errorMsg}</h1>
                <Link to="/welcome">Back to Welcome</Link>
            </section>
        );
    }

    return content;
};

export default UsersList;
