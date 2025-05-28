"use client";

import { postSignUp } from "@/redux/slices/auth/signUp";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { z } from "zod";

const signUpSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  password: z.string().min(1, { message: "Password is required" }),
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  contactNumber: z.string().min(1, { message: "Contact Number required" }),
  birthDate: z.string().min(1, { message: "Birth date required" }),
  profileImage: z.instanceof(File, { message: "Profile image is required" }),
});

type SignUp = z.infer<typeof signUpSchema>;

const SignUpForm = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const {
    register,
    setValue,
    reset,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm({ resolver: zodResolver(signUpSchema) });

  const selectedFile: any = watch("profileImage");

  const onSubmit: any = (data: SignUp) => {
    const formData = new FormData();

    for (let [key, value] of Object.entries(data)) {
      if (key === "profileImage") {
        formData.append(key, value);
      } else {
        formData.append(key, value);
      }
    }

    dispatch(postSignUp(formData)).then((res: any) => {
      if (res.payload?.success) {
        toast.success(res.payload.message);
        router.replace("/signin");
      } else {
        toast.error(res.payload.message);
      }
    });
  };

  return (
    <div className="flex flex-col items-center  p-4 border  text-center h-[950px] bg-blue-50 rounded-2xl ">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-0.5 w-full max-w-sm h-[100px]">
          <label className="block mb-1 text-left">Email</label>
          <input
            {...register("email")}
            className="w-full px-3 py-2 bg-blue-200 border border-gray-300 rounded"
            type="email"
            placeholder="Enter your email"
          />
          {errors?.email && (
            <p className="flex  text-red-400">*{errors.email?.message}</p>
          )}
        </div>

        <div className="mb-0.5 w-full max-w-sm h-[100px]">
          <label className="block mb-1 text-left">Password</label>
          <input
            {...register("password")}
            className="w-full px-3 py-2 bg-blue-200 border border-gray-300 rounded"
            type="password"
            placeholder="Enter your password"
          />
          {errors?.password && (
            <p className="flex  text-red-400">*{errors.password?.message}</p>
          )}
        </div>

        <div className="mb-0.5 w-full max-w-sm h-[100px]">
          <label className="block mb-1 text-left">First Name</label>
          <input
            {...register("firstName")}
            className="w-full px-3 py-2 bg-blue-200 border border-gray-300 rounded"
            type="text"
            placeholder="Enter your first name"
          />
          {errors?.firstName && (
            <p className="flex  text-red-400">*{errors.firstName?.message}</p>
          )}
        </div>
        <div className="mb-0.5 w-full max-w-sm h-[100px]">
          <label className="block mb-1 text-left">Last Name</label>
          <input
            {...register("lastName")}
            className="w-full px-3 py-2 bg-blue-200 border border-gray-300 rounded"
            type="text"
            placeholder="Enter your last name"
          />
          {errors?.lastName && (
            <p className="flex  text-red-400">*{errors.lastName?.message}</p>
          )}
        </div>

        <div className="mb-0.5 w-full max-w-sm h-[100px]">
          <label className="block mb-1 text-left">Contact Number</label>
          <input
            {...register("contactNumber")}
            className="w-full px-3 py-2 bg-blue-200 border border-gray-300 rounded"
            type="number"
            placeholder="Enter your last name"
          />
          {errors?.contactNumber && (
            <p className="flex  text-red-400">
              *{errors.contactNumber?.message}
            </p>
          )}
        </div>

        <div className="mb-0.5 w-full max-w-sm h-[100px]">
          <label className="block mb-1 text-left">Birth Date</label>
          <input
            {...register("birthDate")}
            className="w-full px-3 py-2 bg-blue-200 border border-gray-300 rounded"
            type="date"
            placeholder="Enter your last name"
          />
          {errors?.birthDate && (
            <p className="flex  text-red-400">*{errors.birthDate?.message}</p>
          )}
        </div>

        <div className=" w-full max-w-sm h-[100px]">
          <label className="block mb-1 text-left">Profile Image</label>
          <input
            className="w-full px-3 py-2 bg-blue-200 border border-gray-300 rounded"
            type="file"
            accept="image/*"
            placeholder="Enter your last name"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setValue("profileImage", file);
              }
            }}
          />
          {errors?.profileImage && (
            <p className="flex  text-red-400">
              *{errors.profileImage?.message}
            </p>
          )}
        </div>
        {selectedFile && (
          <div className="flex flex-col items-center justify-center  p-2 rounded-lg space-y-2 ">
            <label className="text-sm font-bold text-gray-700 ">Preview</label>
            <img
              className="w-20 h-20 object-cover rounded-md border"
              src={URL.createObjectURL(selectedFile)}
              alt="Preview"
            />
          </div>
        )}

        <button
          type="submit"
          className="px-3 py-2 bg-blue-200 border border-gray-300 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
