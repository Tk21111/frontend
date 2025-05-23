import { useEffect } from 'react';
import { useGetOMutation } from './usersApiSlice';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../auth/authSlice';
import WhoReU from './UserNoToName';

const UserO = () => {
   
    const [getO, { data: users, isLoading, isSuccess, isError, error }] = useGetOMutation('user', {
        pollingInterval: 60000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    });
    //req didn't get header ={username : user} so this fucking tthing is useless
    useEffect(() => {
        const fetchData = async () => {
            try {
             
                await getO();
                
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [ getO]);

    let content;

    if (isLoading) {
        content = <p>Loading...</p>;
    } else if (isSuccess) {
        content = (
            <section className="flex flex-col justify-center align-middle text-center">
                <h1>U have to give to </h1>
                <h2 >{`No. : ${users}`}</h2>
                <h2 >{`ชื่อเล่น : ${WhoReU(users)?.split(' ')[0]}`}</h2>
                <h2 >{`ชื่อ : ${WhoReU(users)?.split(' ')[1]}`}</h2>
                <h2 >{`นามสกุล : ${WhoReU(users)?.split('  ')[1]}`}</h2>
                <Link to="/welcome">Back to Welcome</Link>
            </section>
        );
    } else if (isError) {
        let msg 
        if (error.status === 403) { msg = "Access deny go to get random number first"} else { msg = JSON.stringify(error)};
        content = (
            <section>
                <h1>{msg}</h1>
                <Link to="/welcome">Back to Welcome</Link>
            </section>  
    )
    }

    return content;
};

export default UserO;
