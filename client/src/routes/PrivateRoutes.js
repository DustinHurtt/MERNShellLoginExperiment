import { Navigate, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';

const PrivateRoutes = ({logout}) => {

    return (
        <Routes>
            <Route path="/" element={<Home logout={logout} />}  />
            <Route
                path="*"
                element={<Navigate to="/" replace />}
            />
        </Routes> 
        )

}

export default PrivateRoutes