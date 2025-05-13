import { Outlet, Link } from "react-router-dom";
import { useEffect, useRef, useState } from 'react';
import { useRefreshMutation } from "./authApiSlice";
import usePersist from "../../hooks/usePersist";
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentToken, setCredentials } from "./authSlice";
import PulseLoader from 'react-spinners/PulseLoader';
import { jwtDecode } from 'jwt-decode';

//im confuse wtf -29/10/2024

const PersistLogin = () => {
    const [persist] = usePersist();
    const token = useSelector(selectCurrentToken);
    const effectRan = useRef(false);
    const dispatch = useDispatch();

    const [trueSuccess, setTrueSuccess] = useState(false);

    const [refresh, {
        isUninitialized,
        isLoading,
        isSuccess,
        isError,
        error
    }] = useRefreshMutation();

    useEffect(() => {
        // Skip the first effect run in development mode due to React 18 Strict Mode
        if (effectRan.current === true || process.env.NODE_ENV !== 'development') {
            const verifyRefreshToken = async () => {

                try {
                    //why writing when i already

                    const refreshToken = localStorage.getItem("refreshToken");
                    const response = await refresh({ refreshToken }).unwrap();

                    const  accessToken  = response.accessToken
                    const decoded = jwtDecode(accessToken);

                    dispatch(setCredentials({user : decoded.userinfo.username , roles : decoded.userinfo.roles}));

                    setTrueSuccess(true);

                } catch (err) {
                    console.error(err);
                }
            };
            if (!token) verifyRefreshToken();
        }

        return () => effectRan.current = true;
    }, [token, refresh]);

    let content;
    if (isLoading) {
        // When the refresh token is being verified
        content = <PulseLoader color={"#FFF"} />;
    } else if (isError) {
        // When there's an error verifying the refresh token
        console.log(error)
        content = (
            <p className='errmsg'>
                {`${error?.data?.message} - `}
                <Link to="/login">Please login again</Link>.
            </p>
        );
    } else if (isSuccess && trueSuccess) {
        // When the token is successfully verified
        content = <Outlet />;
    } else if (token && isUninitialized) {
        // When there is a token but the mutation is not initialized
        content = <Outlet />;
    }

    return content;
};

export default PersistLogin;
