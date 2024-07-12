"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../../../components/ui/table";
import { Button } from "../../../../../components/ui/button";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
const ViewBookings = ({ params }) => {

  const [bookings, setBookings] = useState([]);
  const user = localStorage.getItem("username");
  const userId = localStorage.getItem("userId");
  const bookingId = localStorage.getItem("bookingId");

    useEffect(() => {
    const userBookings = localStorage.getItem('userBookings');
    if (userBookings) {
      setBookings(JSON.parse(userBookings));
    }
  }, []);
  const router = useRouter();


  useEffect(() => {
    async function fetchData() {
      console.log(bookingId, userId);
      const response = await axios.get(
        "http://localhost:4000/api/booking/getbook",
        {
          params: {
            bookingId: bookingId,
            userId: userId,
          },
        }
      );
     
       setBookings((prevBookings) => [response.data, ...prevBookings]);
    }
    fetchData();
  }, [bookingId, userId]);
  const onDeleteHandler = async (id) => {
    const newId = parseInt(id, 10);
    try {
      const response = await axios.delete(
        `http://localhost:4000/api/booking/deletebook`,
        {
          data: { userId: userId, bookingId: bookingId },
        }
      );
      toast.success("booking deleted successfully");
      window.location.reload();
      console.log(response.data);
    } catch (error) {
      console.log("Failed to delete booking", error);
      toast.error("Something went wrong!");
    }
  };

  const onEditHandler = (bookingId) => {
    console.log(bookingId);
    router.push(`/editbooking/${bookingId}/singleedit`);
  };
  return (
    <div>
      {" "}
      <Table>
        <TableCaption>A list of your recent bookings.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Id</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Hotel</TableHead>
            <TableHead>CheckIn</TableHead>
            <TableHead>CheckOut</TableHead>
            <TableHead>Rooms</TableHead>
            <TableHead>Adults</TableHead>
            <TableHead>Children</TableHead>
            <TableHead>Phone</TableHead>

            <TableHead className="text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookings.map((data,i) => (
            <TableRow key={data.id}>
              <TableCell className="font-medium">{i+1}</TableCell>
              <TableCell className="font-medium">{data.name}</TableCell>
              <TableCell className="font-medium">{data.hotelName}</TableCell>
              <TableCell className="font-medium">{data.checkIn}</TableCell>
              <TableCell>{data.checkOut}</TableCell>
              <TableCell>{data.rooms}</TableCell>
              <TableCell>{data.adults}</TableCell>
              <TableCell>{data.children}</TableCell>
              <TableCell>{data.phone}</TableCell>
              <TableCell className="text-right space-x-4">
                <Button
                  className="bg-yellow-400"
                  onClick={() => onEditHandler(data.id)}
                >
                  Edit
                </Button>
                <Button
                  className="bg-red-400"
                  onClick={() => onDeleteHandler(data.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter></TableFooter>
      </Table>
    </div>
  );
};

export default ViewBookings;
