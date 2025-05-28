'use client'

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { z } from "zod";

const signUpSchema = z.object({
    email: z.string().email({ message: "Invalid email" }),
    password: z.string({}),
    firstName: z.string().min(1, { message: "First name is required" }),
    lastName: z.string().min(1, { message: "Last name is required" }),
    contactNumber: z.number().min(1, { message: "Last name is required" }),
    birthDate: z.date({ required_error: "Birth date is required" }),
});

type SignUp = z.infer<typeof signUpSchema>;

const SignUpForm = () => {
    const dispatch = useDispatch();
    const {
        register,
        setError,
        setValue,
        reset,
        formState: { errors },
        handleSubmit,
    } = useForm({ resolver: zodResolver(signUpSchema) });

    const onSubmit: any = (data: SignUp) => { };

    return <div className="flex flex-col items-center  p-4 border  text-center h-[350px] ">
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4 w-full max-w-sm h-[100px]">
                <label className="block mb-1 text-left">Email</label>
                <input
                    {...register("email")}
                    className="w-full px-3 py-2 bg-blue-200 border border-gray-300 rounded"
                    type="email"
                    placeholder="Enter your email"
                />
                {errors?.email && <p>{errors.email?.message}</p>}
            </div>

            <div className="mb-4 w-full max-w-sm h-[100px]">
                <label className="block mb-1 text-left">Password</label>
                <input
                    {...register("password")}
                    className="w-full px-3 py-2 bg-blue-200 border border-gray-300 rounded"
                    type="password"
                    placeholder="Enter your password"
                />
                {errors?.password && <p>{errors.password?.message}</p>}

            </div>

            <div className="mb-4 w-full max-w-sm h-[100px]">
                <label className="block mb-1 text-left">First Name</label>
                <input
                    {...register("firstName")}
                    className="w-full px-3 py-2 bg-blue-200 border border-gray-300 rounded"
                    type="text"
                    placeholder="Enter your password"
                />
                {errors?.firstName && <p>{errors.firstName?.message}</p>}

            </div>

            <button type="submit" className="px-3 py-2 bg-blue-200 border border-gray-300 rounded">
                Submit
            </button>
        </form>
    </div>
};

export default SignUpForm;
