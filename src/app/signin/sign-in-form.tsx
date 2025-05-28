"use client";
import { postSignin } from "@/redux/slices/auth/signIn";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid Email" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export const SignInForm = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const {
    register,
    setError,
    setValue,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm({ resolver: zodResolver(loginSchema) });

  const onSubmit: any = (data: { emil: string; password: string }) => {
    dispatch(postSignin(data)).then((res: any) => {
      console.log(res?.payload?.success, "res?.payload?.success");
      if (res?.payload?.success) {
        toast.success(res.payload.message);
        router.replace("/");
      }

      // else {
      //   toast.error(res.payload.message);
      // }
    });
  };
  return (
    <div className="flex flex-col items-center  p-4 border  text-center h-[350px] ">
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
          {errors?.email && <p>{errors.email?.message}</p>}
        </div>
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
