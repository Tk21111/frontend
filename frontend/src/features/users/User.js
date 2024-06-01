import { useEffect } from 'react';
import { useGetOMutation } from './usersApiSlice';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../auth/authSlice';

const UserO = () => {
    const user = useSelector(selectCurrentUser);
    const [getO, { data: users, isLoading, isSuccess, isError, error }] = useGetOMutation('user', {
        pollingInterval: 60000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    });
    //req didn't get header ={username : user} so this fucking tthing is useless
    useEffect(() => {
        const fetchData = async () => {
            try {
                if (user) {
                    await getO(user);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [user, getO]);

    let content;

    if (isLoading) {
        content = <p>Loading...</p>;
    } else if (isSuccess) {
        content = (
            <section className="users">
                <h1>Users List</h1>
                <h1>{ users }</h1>
                <Link to="/welcome">Back to Welcome</Link>
            </section>
        );
    } else if (isError) {
        content = <p>{JSON.stringify(error)}</p>;
    }

    return content;
};

export default UserO;
