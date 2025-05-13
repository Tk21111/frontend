import { useEffect, useState, useRef } from 'react';
import { useGetRandnumMutation, useSetRanNumMutation } from './usersApiSlice';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentNo, selectCurrentUser } from '../auth/authSlice';
import WhoReU from './UserNoToName';
import { Eye, EyeClosed } from 'lucide-react';
import ButtonRanNum from '../../components/button';
import Confetti from '../../components/celebrate';

const UserO = () => {
    //const currentUser = useSelector(selectCurrentUser); // Get current user from redux state
    //const user = currentUser?.username || 'gvbhnj'; // Default to 'gvbhnj' if no current user //wtf is this ?????? && why is this even require  -29/10-2024 
    const [getRandnum, { data: users, isLoading, isSuccess, isError, error }] = useSetRanNumMutation();
    const userRef = useRef();
    const [userMsg, setUserMsg] = useState('');
    const [number , setNumber] = useState()
    const [fetched , setFetched] = useState(false)

    const [show , setShow] = useState(true)

    const [isVisible, setIsVisible] = useState(false);
    const [loadPage , setLoadPage] = useState(false)

    const [userName , setUserName] = useState(useSelector(selectCurrentUser))
    const [userNo , setUserNo] = useState(useSelector(selectCurrentNo)) 

    useEffect(()=> {
        const timeout = setTimeout(()=>{
            setLoadPage(true);
        } , 100)
    },[])


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
    }, [error, isError, users , fetched]);


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
            <div className='flex flex-col'>
                <div className='text-end text-lg '>{userName + " no : " + userNo}</div>
                <section className={`login flex flex-col justify-center mt-[10%] align-middle text-center duration-500 ease-in ${loadPage ? "opacity-100" : "opacity-0"}`}>
                    <h2>u have to give toooooo!!!</h2>
                    {users && show? <div className={`transition-all duration-500 ease-in-out ${users ? "opacity-100" : "opacity-0"}`}>
                        <h2 >{`No. : ${number}`}</h2>
                        <h2 >{`ชื่อเล่น : ${WhoReU(number)?.split(' ')[0]}`}</h2>
                        <h2 >{`ชื่อ : ${WhoReU(number)?.split(' ')[1]}`}</h2>
                        <h2 >{`นามสกุล : ${WhoReU(number)?.split('  ')[1]}`}</h2>
                        
                    </div> : null}
                    <div className='justify-items-center'>
                        {!show ? <Eye onClick={()=>setShow(!show)}/> : <EyeClosed onClick={()=>setShow(!show)}/>}
                    </div>
                    {!users ?  <h1 style={{color: 'red'}}> \/ select one \/</h1> : null}
                    <div className='grid grid-cols-2 gap-4 rounded-box shadow-md py-20 transition delay-150 duration-300 ease-in-out'>
                        
                        {!users ? Array.from({ length: (Math.floor(Math.random()* 20) + 2) }, (_, i) => (
                            <ButtonRanNum i={i} key={i} func={fetchData}/>
                        )) : null}
                    </div>
                    <Link to="/welcome">Back to Welcome</Link>
                    
                </section>
                {/*isVisible && <Confetti />*/}
            </div>
            
        );
    }

    return content;
};

export default UserO;
