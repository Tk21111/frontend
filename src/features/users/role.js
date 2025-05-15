import { useSelector } from "react-redux";
import { selectCurrentRoles } from "../auth/authSlice";

const useRoleCheck = (check) => {
    const roles = useSelector(selectCurrentRoles);

    if (roles) {
        if (check === 'Admin' && roles['Admin'] === 5150) {
            return true;
        } else if (check === 'Editor' && roles['Editor'] === 1984) {
            return true;
        } else {
            return false;
        }
    }

    return false;
};

export default useRoleCheck;
