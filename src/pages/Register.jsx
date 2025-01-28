import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { registerUser, clearError } from '../features/user/userSlice';
import { useNavigate, Link } from 'react-router-dom';
import { useEffect } from 'react';

const Register = () => {
    const dispatch = useDispatch();
    const { loading, error, userInfo } = useSelector((state) => state.user);
    const navigate = useNavigate();

    useEffect(() => {
        // Clear previous errors and check if the user is already logged in
        dispatch(clearError());

        const storedUserInfo = localStorage.getItem('userInfo');
        if (userInfo || storedUserInfo) {
            navigate('/dashboard'); // Redirect to the dashboard if already logged in
        }
    }, [dispatch, userInfo, navigate]);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        console.log('Registration form submitted:', data);

        const userData = {
            ...data,
            role: 'admin', // Add a default role if required
        };

        try {
            const resultAction = await dispatch(registerUser(userData));
            if (registerUser.fulfilled.match(resultAction)) {
                navigate('/dashboard'); // Redirect to dashboard after successful registration
            } else {
                console.error('Registration failed:', resultAction.payload);
            }
        } catch (err) {
            console.error('Error during registration:', err);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
            <div className="bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold text-center mb-4 text-green-400">Sign Up</h1>
                {error && <p className="text-red-500 text-center mb-4">{error?.message}</p>}
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label className="block text-gray-200 text-sm font-medium mb-1">Name</label>
                        <input
                            type="text"
                            {...register('name', { required: 'Name is required' })}
                            className="w-full px-4 py-2 border rounded-lg bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400"
                        />
                        {errors.name && (
                            <p className="text-red-500 text-sm">{errors.name.message}</p>
                        )}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-200 text-sm font-medium mb-1">Email</label>
                        <input
                            type="email"
                            {...register('email', { required: 'Email is required' })}
                            className="w-full px-4 py-2 border rounded-lg bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400"
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm">{errors.email.message}</p>
                        )}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-200 text-sm font-medium mb-1">Password</label>
                        <input
                            type="password"
                            {...register('password', { required: 'Password is required' })}
                            className="w-full px-4 py-2 border rounded-lg bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400"
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm">{errors.password.message}</p>
                        )}
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-green-600 hover:bg-green-500 text-white font-medium py-2 px-4 rounded-lg transition duration-300"
                    >
                        {loading ? 'Signing up...' : 'Sign Up'}
                    </button>
                </form>
                <div className="mt-6 text-center">
                    <p className="text-gray-500 text-sm">
                        Already have an account?{' '}
                        <Link
                            to="/login"
                            className="text-teal-600 hover:underline font-medium"
                        >
                            Log in here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
