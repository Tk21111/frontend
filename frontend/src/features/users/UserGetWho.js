import { useEffect } from 'react';
import { useGetWhoMutation } from './usersApiSlice';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../auth/authSlice';

const UsergetWho = () => {
    const user = useSelector(selectCurrentUser);
    const [getWho, { data: users, isLoading, isSuccess, isError, error }] = useGetWhoMutation()
    //req didn't get header ={username : user} so this fucking tthing is useless
    useEffect(() => {
        const fetchData = async () => {
            try {
                if (user) {
                    await getWho(user);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [user, getWho]);

    let content;

    if (isLoading) {
        content = <p>Loading...</p>;
    } else if (isSuccess) {
        
        content = (
            <section className="users">
                <h1>Users List</h1>
                <h2>Your giver is {users.username} by the No. of {users.no} !!!!!</h2>
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

export default UsergetWho;
