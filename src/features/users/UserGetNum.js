import { useEffect, useState, useRef } from 'react';
import { useGetRandnumMutation } from './usersApiSlice';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../auth/authSlice';
import WhoReU from './UserNoToName';
import { Eye, EyeClosed } from 'lucide-react';
import ButtonRanNum from '../../components/button';
import Confetti from '../../components/celebrate';

const UserO = () => {
    //const currentUser = useSelector(selectCurrentUser); // Get current user from redux state
    //const user = currentUser?.username || 'gvbhnj'; // Default to 'gvbhnj' if no current user //wtf is this ?????? && why is this even require  -29/10-2024 
    const [getRandnum, { data: users, isLoading, isSuccess, isError, error }] = useGetRandnumMutation();
    const userRef = useRef();
    const [userMsg, setUserMsg] = useState('');
    const [number , setNumber] = useState()
    const [fetched , setFetched] = useState(false)

    const [isVisible, setIsVisible] = useState(false);
    const [loadPage , setLoadPage] = useState(false)

    useEffect(()=> {
        const timeout = setTimeout(()=>{
            setLoadPage(true);
        } , 100)
    },[])

    const userName = useSelector(selectCurrentUser)

    const fetchData = async () => {
        try {
              
            setNumber((await getRandnum())['data']); 
            if (number) {
                const result = WhoReU(number);
                setUserMsg(`No. : ${number} Name : ${result}`);
                setIsVisible(true)
            }
                
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };



        
   

    useEffect(() => {
        if (number >0 && number <=37) {
            const result = WhoReU(number);
            setUserMsg(`No. : ${number} Name : ${result}`);
        } else if (error?.status === 409 || error?.status === 403 ) {
            setUserMsg('Already have random number');
        } else if (isError) {
            setUserMsg('An error occurred' + error?.status);
        }  
        console.log(error?.status);
    }, [error, isError, users , fetched]);


    console.log(number)
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
            <>
                <section className={`login flex flex-col justify-start mt-[10%] align-middle text-center duration-500 ease-in ${loadPage ? "opacity-100" : "opacity-0"}`}>
                    <div className='justify-end text-2xl text-end mb-[5%]'>{userName}</div>
                    <h2>u have to give toooooo!!!</h2>
                    {users ? <div className='transition-all duration-200 ease-in-out'>
                        <h2 >{`No. : ${number}`}</h2>
                        <h2 >{`ชื่อเล่น : ${WhoReU(number)?.split(' ')[0]}`}</h2>
                        <h2 >{`ชื่อ : ${WhoReU(number)?.split(' ')[1]}`}</h2>
                        <h2 >{`นามสกุล : ${WhoReU(number)?.split('  ')[1]}`}</h2>
                    </div> : null}
                    <div className='seclect'>
                    {!users ?  <h1 style={{color: 'red'}}> \/ select one \/</h1> : null}
                    {!users ? Array.from({ length: (Math.floor(Math.random()* 36) + 1) }, (_, i) => (
                        <ButtonRanNum i={i} key={i} func={fetchData}/>
                    )) : null}
                    </div>
                    <Link to="/welcome">Back to Welcome</Link>
                    
                </section>
                {/*isVisible && <Confetti />*/}
            </>
            
        );
    }

    return content;
};

export default UserO;
