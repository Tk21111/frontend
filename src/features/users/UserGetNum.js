import { useEffect, useState, useRef } from 'react';
import { useGetRandnumMutation } from './usersApiSlice';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../auth/authSlice';
import WhoReU from './UserNoToName';

const UserO = () => {
    const currentUser = useSelector(selectCurrentUser); // Get current user from redux state
    const user = currentUser?.username || 'gvbhnj'; // Default to 'gvbhnj' if no current user
    const [getRandnum, { data: users, isLoading, isSuccess, isError, error }] = useGetRandnumMutation();
    const userRef = useRef();
    const [userMsg, setUserMsg] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (user) {
                    await getRandnum({ username: user }); // Pass user object
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [user, getRandnum]);

    useEffect(() => {
        if (error?.status === 409) {
            setUserMsg('Already have random number');
        } else if (isError) {
            setUserMsg('An error occurred');
        } else if (users) {
            const result = WhoReU(users.no);
            setUserMsg(`Your giver is ${users.username} with a number of ${users.no} which is named ${result}`);
        }
    }, [error, isError, users]);

    let content;

    if (isLoading) {
        content = <p>Loading...</p>;
    } else if (isError) {
        content = (
            <section className='users'>
                <h2 ref={userRef} className={userMsg ? "usermsg" : "offscreen"} aria-live="assertive">{userMsg}</h2>
                <Link to='/user'>Your random number</Link>
                <Link to="/welcome">Back to Welcome</Link>
            </section>
        );
    } else {
        content = (
            <section>
                <h2>u have to give toooooo!!!</h2>
                <h2 ref={userRef} className={userMsg ? "usermsg" : "offscreen"} aria-live="assertive">{userMsg}</h2>
                <Link to="/welcome">Back to Welcome</Link>
            </section>
        );
    }

    return content;
};

export default UserO;
