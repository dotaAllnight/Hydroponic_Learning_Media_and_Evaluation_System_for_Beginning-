"use client"
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';


const FormSchema = z
    .object({
        username: z.string().min(1, 'Username is required').max(100),
        email: z.string().min(1, 'Email is required').email('Invalid email'),
        password: z
            .string()
            .min(1, 'Password is required')
            .min(8, 'Password must have than 8 characters'),
        confirmPassword: z.string().min(1, 'Password confirmation is required'),
    })
    .refine((data) => data.password === data.confirmPassword, {
        path: ['confirmPassword'],
        message: 'Password do not match',
    });

const SignUpForm = () => {
    const router = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
    });

    const onSubmit = async (values: z.infer<typeof FormSchema>) => {
        const response = await fetch('/api/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: values.username,
                email: values.email,
                password: values.password
            })
        })

        if (response.ok) {
            router.push('/')
        } else {
            console.error('Registration Fail')
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} style={formStyle}>
            <div style={inputContainer}>
                <label>Username</label>
                <input {...register('username')} style={inputStyle} />
                {errors.username && <p style={errorStyle}>{errors.username.message}</p>}
            </div>

            <div style={inputContainer}>
                <label>Email</label>
                <input {...register('email')} style={inputStyle} />
                {errors.email && <p style={errorStyle}>{errors.email.message}</p>}
            </div>

            <div style={inputContainer}>
                <label>Password</label>
                <input type="password" {...register('password')} style={inputStyle} />
                {errors.password && <p style={errorStyle}>{errors.password.message}</p>}
            </div>

            <div style={inputContainer}>
                <label>Confirm Password</label>
                <input type="password" {...register('confirmPassword')} style={inputStyle} />
                {errors.confirmPassword && <p style={errorStyle}>{errors.confirmPassword.message}</p>}
            </div>

            <button type="submit" style={submitButtonStyle}>Sign Up</button>
        </form>
    );
}

// Inline CSS styles
const formStyle = {
    maxWidth: '400px',
    margin: '0 auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    backgroundColor: '#f9f9f9',
};

const inputContainer = {
    marginBottom: '15px',
};

const inputStyle = {
    width: '100%',
    padding: '8px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '4px',
};

const errorStyle = {
    color: 'red',
    fontSize: '12px',
};

const submitButtonStyle = {
    padding: '10px 20px',
    fontSize: '16px',
    color: '#fff',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
};

export default SignUpForm;
