"use client";
import { useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
const page = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);
  const onNavigate = () => {
    if (!userId) {
      router.push("/sign-in");
    } else {
      router.push(`/bookForm/${userId}/booking`);
    }
  };
  const bookingId = localStorage.getItem("bookingId");
  return (
    <div className="justify-center items-center text-red-400 grid mx-auto">
      <h1 className="text-white text-3xl text-center mx-auto top-20 relative">
        Find your next stay Search deals on hotels, & much more...
      </h1>
      <div className=" justify-center sm:flex items-center relative   top-24 sm:top-20 xl:top-40 space-x-10 space-y-10">
        {isLoggedIn  ? (
          <Link href={`/updatebooking/${bookingId}/viewBookings`}>
            <Button className={"bg-white text-blue-500  text-2xl mx-auto items-center justify-center grid xl:mt-10"}>
              View Your Bookings
            </Button>
          </Link>
        ) : (
          <Link href={`/sign-in`}>
            <Button className={"bg-white text-blue-500  text-2xl mx-auto items-center justify-center grid"}>
              LogIn
            </Button>
          </Link>
        )}

        <Button
          className="bg-white text-blue-500  text-2xl relative left-12 sm:left-0 "
          onClick={onNavigate}
        >
          Make a new Booking
        </Button>
      </div>
    </div>
  );
};

export default page;
