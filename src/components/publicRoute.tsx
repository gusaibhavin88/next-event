"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

interface Props {
  children: React.ReactNode;
}

export default function PublicRoute({ children }: Props) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  const { isAuthenticated } = useSelector((state: any) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard"); // Redirect if already authenticated
    } else {
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  if (isLoading) {
    return <div>Loading...</div>; // Optional loader
  }

  return <>{children}</>;
}
