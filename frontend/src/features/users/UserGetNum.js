import { useEffect } from 'react';
import { useGetRandnumMutation } from './usersApiSlice';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../auth/authSlice';

const UserO = () => {
    const user = useSelector(selectCurrentUser);
    const [getRandnum, { data: users, isLoading, isSuccess, isError, error }] = useGetRandnumMutation()
    //req didn't get header ={username : user} so this fucking tthing is useless
    useEffect(() => {
        const fetchData = async () => {
            try {
                if (user) {
                    await getRandnum(user);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [user, getRandnum]);

    let content;

    if (isLoading) {
        content = <p>Loading...</p>;
    } else if (isSuccess) {
        content = (
            <section className="users">
                <h1>Users List</h1>
                <h1>{users}</h1>
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

export default UserO;
