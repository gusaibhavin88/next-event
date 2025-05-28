import Image from "next/image";
import AuthWrapperOne from "../shared/auth-layout/auth-wrapper-one";
import SignUpForm from "./signUp.tsx";
import sampleImage from "../../../public/next.svg";

const signUpPage = () => {
  return (
    <div>
      <AuthWrapperOne
        title={
          <>
            Welcome to Test.{" "}
            <span className="relative inline-block">
              Sign in to
              {/* <UnderlineShape className="absolute -bottom-2 start-0 h-2.5 w-24 text-blue md:w-28 xl:-bottom-1.5 xl:w-36" /> */}
            </span>{" "}
            continue.
          </>
        }
        description="Please enter your credentials to access your personalized account and manage your educational journey seamlessly. If you encounter any issues, contact our support team for assistance."
        bannerTitle="Let the learning begin!"
        bannerDescription=""
        pageImage={
          <div className="relative mx-auto aspect-[4/3.37] w-[500px] xl:w-[620px] 2xl:w-[820px]">
            <Image
              src={sampleImage}
              alt="Sign In Thumbnail"
              fill
              priority
              sizes="(max-width: 768px) 100vw"
              className="object-fit"
            />
          </div>
        }
      >
        <SignUpForm />
      </AuthWrapperOne>
    </div>
  );
};

export default signUpPage;
