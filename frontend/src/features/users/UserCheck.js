import { useEffect } from 'react';
import { useCheckDullMutation } from './usersApiSlice';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../auth/authSlice';

const Usercheck = () => {
    const user = useSelector(selectCurrentUser);
    const [checkDull, { data: users, isLoading, isSuccess, isError, error }] = useCheckDullMutation()
    //req didn't get header ={username : user} so this fucking tthing is useless
    useEffect(() => {
        const fetchData = async () => {
            try {
                if (user) {
                    await checkDull(user);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [user, checkDull]);

    let content;

    if (isLoading) {
        content = <p>Loading...</p>;
    } else if (isSuccess) {
        content = (
            <section className="users">
                <h1>Users List</h1>
                <h1>{JSON.stringify(users)}</h1>
                <Link to="/welcome">Back to Welcome</Link>
            </section>
        );
    } else if (isError) {
        content = (
            <section className='users' >
                <p>{JSON.stringify(error)}</p>
                <Link to="/welcome">Back to Welcome</Link>
        </section>
    );
    }

    return content;
};

export default Usercheck;
