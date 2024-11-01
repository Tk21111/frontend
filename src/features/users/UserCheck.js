import { useEffect } from 'react';
import { useCheckDullMutation } from './usersApiSlice';
import { Link } from 'react-router-dom';
import useRoleCheck from './role';
import WhoReU from './UserNoToName';

const Usercheck = () => {
    const [checkDull, { data: users, isLoading, isSuccess, isError, error }] = useCheckDullMutation();
    const isEditor = useRoleCheck('Editor');
    let content;

    useEffect(() => {
        const fetchData = async () => {
            try {
                await checkDull();
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        
        fetchData();
    }, [checkDull]);

    if (!isEditor) {
        // User is not an editor, so show this content
        content = (
            <section className="users">
                <h1>wtf r u doing here</h1>
                <Link to="/welcome">Back to Welcome</Link>
            </section>
        );
    } else if (isLoading) {
        content = <p>Loading...</p>;
    } else if (isSuccess) {
        content = (
            <section className="users">
                <h1>Check for Duplicate, please don't have one</h1>
                <h1>{JSON.stringify(users.map(val => whoReU(val)}</h1>
                <Link to="/welcome">Back to Welcome</Link>
            </section>
        );
    } else if (isError) {
        const msg = error?.originalStatus === 401 ? "You don't have permission" : JSON.stringify(error);
        content = (
            <section>
                <h1>{msg}</h1>
                <Link to="/welcome">Back to Welcome</Link>
            </section>
        );
    }

    return content;
};

export default Usercheck;
