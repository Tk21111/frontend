import { useEffect, useState, useRef } from 'react';
import { useGetRandnumMutation } from './usersApiSlice';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../auth/authSlice';
import WhoReU from './UserNoToName';

const UserO = () => {
    //const currentUser = useSelector(selectCurrentUser); // Get current user from redux state
    //const user = currentUser?.username || 'gvbhnj'; // Default to 'gvbhnj' if no current user //wtf is this ?????? && why is this even require  -29/10-2024 
    const [getRandnum, { data: users, isLoading, isSuccess, isError, error }] = useGetRandnumMutation();
    const userRef = useRef();
    const [userMsg, setUserMsg] = useState('');
    const [number , setNumber] = useState()

    useEffect(() => {
        const fetchData = async () => {
            try {
              
                setNumber((await getRandnum())['data']); 
                
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [ getRandnum]);

    useEffect(() => {
        if (number >= 0 && number <=36) {
            const result = WhoReU(number);
            setUserMsg(`No. : ${number} Name : ${result}`);
        } else if (error?.status === 409 || error?.status === 403 ) {
            setUserMsg('Already have random number');
        } else if (isError) {
            setUserMsg('An error occurred' + error?.status);
        }  
        console.log(error?.status);
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
