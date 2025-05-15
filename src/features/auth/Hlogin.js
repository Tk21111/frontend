import { useRef, useState, useEffect } from 'react'
import { useNavigate , Link } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentToken, setCredentials } from './authSlice'
import { useLoginMutation } from './authApiSlice'
import usePersist from '../../hooks/usePersist'
import { jwtDecode } from 'jwt-decode'
import WhoReU from '../users/UserNoToName'
import { Eye, EyeClosed } from 'lucide-react'

const Login = () => {

    const errRef = useRef()
    const [number , setNumber] = useState(null);
    const [pwd , setPwd] = useState(null);

    const [show , setShow] = useState(false);
    const [errMsg, setErrMsg] = useState('')
    
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [login, { data , isLoading , isSuccess }] = useLoginMutation()

    useEffect(() => {
        setErrMsg('')
    }, [number])


    const handleSubmit = async (e) => {
        e.preventDefault()
        //console.log(user)
        try {

            if(number > 37 && !pwd){
                setErrMsg("Require pwd for Admin and Editor")
            }
            const userData = await login({number , pwd}).unwrap()

            const res =  userData.accessToken
            const decode =  jwtDecode(res)
      
            //diffrent the ...userData is a accessToken
            dispatch(setCredentials({ ...userData, roles : decode.userinfo.roles }))

            const timeout = setTimeout( () => { 
                navigate('/welcome')
            },2000)
            
        } catch (err) {
            console.error(err)
            if (!err?.status) {
                // isLoading: true until timeout occurs
                setErrMsg('No Server Response');
            } else if (err.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.status === 401) {
                setErrMsg('Unauthorized ' + err.data.msg);
            } else {
                setErrMsg('Login Failed pls wait or change username');
            }

            if (errRef.current) return errRef.current.focus();
            
        }
    }


    const content =  (
        <div className="flex flex-col sm:justify-center sm:mt-0 justify-self-start mt-[20%] p-3 align-middle">
            {!isSuccess ?  (
            <section className='flex flex-col items-center justify-center'>
            
                {isLoading ? <h1>Loading...</h1> : null }
                <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p> 

                <h1 className='text-3xl font-bold'>Login</h1>
                
                <form onSubmit={handleSubmit} className='flex flex-col space-y-2.5'> 
                    <div className='flex flex-col space-y-0.5'>
                        <label htmlFor="username">เลขที่:</label>
                        <select className='text-black' onChange={(e)=> setNumber(e.target.value)} required value={number}>
                            {Array.from({ length : 40} , (_,i) => <option value={i} key={i} className='text-black'>{!i ? "select": i === 38 ? "Admin" : i===39 ? "Editor" : i}</option>)}
                        </select>
                    </div>
                
                    <div className='flex flex-col space-y-0.5'>
                        <label>pwd</label>
                        
                        <div className='flex flex-row justify-items-center space-x-1.5'>
                            <input
                                onChange={(e)=>setPwd(e.target.value)}
                                value={pwd}
                                autoComplete={false}
                                type={show ?'text' : 'password'  }
                                className='text-black w-full'
                                required
                            >
                            </input>
                            <div className='mt-[3%]'>
                                {!show ? <Eye onClick={()=>setShow(!show)}/> : <EyeClosed onClick={()=>setShow(!show)}/>}
                            </div>
                            
                        </div>
                    </div>

                    
                    {number > 0 && <p className="text-white">{WhoReU(number)}</p>}
                    <button className='bg-white text-black hover:bg-blue-500 mt-3.5'>log In</button>

                </form>
            </section>) : (
                <div>
                    <p className="animate-fade text-center font-bold text-xl">Welcome</p>
                    <p className="animate-fade text-center font-bold text-3xl">{data.user}</p>
                </div>
            )
            }        
        </div>
        
    )

    return content
}
export default Login
