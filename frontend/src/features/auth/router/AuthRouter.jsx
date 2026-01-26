import {Route,Routes} from 'react-router-dom';
import AuthLayout from '../layout/AuthLayout';
import AuthLogin from '../pages/user/AuthLogin';
import AuthRegister from '../pages/user/AuthRegister';
import VerifyEmailInfo from '../pages/user/VerifyEmailInfo';
import VerifyEmailResult from '../pages/user/VerifyEmailResult';
import AuthResetPassword from '../pages/user/AuthResetPassword';
import AuthResetPasswordInfo from '../pages/user/AuthResetPasswordInfo';
import ResetPasswordConfirmation from '../pages/user/AuthResetConfirmation'; 
import AuthForgotPassword from '../pages/user/AuthForgotPassword';
import AuthLanding from '../pages/user/AuthLanding';
import AuthAdminLogin from '../pages/admin/AdminLogin';
export default function AuthRouter() {
    return (
            <Route element={<AuthLayout />}>
                <Route path="/landing" element={<AuthLanding />} />
                <Route path="/login" element={<AuthLogin />} />
                <Route path="/register" element={<AuthRegister />} />
                <Route path="/verify-email-info" element={<VerifyEmailInfo />} />
                <Route path="/verify-email" element={<VerifyEmailResult />} />
                <Route path="/forgot-password" element={<AuthForgotPassword />} />
                <Route path="/reset-password/:uid/:token" element={<AuthResetPassword />} />
                <Route path="/reset-password" element={<AuthResetPasswordInfo />} />
                <Route path="/reset-confirmation" element={<ResetPasswordConfirmation />} />
                <Route path="/auth/admin/login" element={<AuthAdminLogin />} />
            </Route>
    );
}