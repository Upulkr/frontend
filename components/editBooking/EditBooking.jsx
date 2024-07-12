"use client";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 characters." }),
hotelName: z.string().optional(),
  checkIn: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid check-in date.",
  }),
  checkOut: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid check-out date.",
  }),
  email: z.string().email({ message: "Invalid email address." }),
  adults: z.string().min(1, { message: "There must be at least 1 adult." }),
  children: z.string(),
  rooms: z.string().min(1, { message: "There must be at least 1 room." }),
  price: z.string(),
});



const EditBooking = ({ id }) => {

console.log(id)
  const [bookings, setBookings] = useState([]);
  const userId = localStorage.getItem("userId");
  const bookingId = localStorage.getItem("bookingId");
  const router = useRouter();

    const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      hotelName:"",
      checkIn: "",
      checkOut: "",
      email: "",
      adults: "",
      children: "",
      rooms: "",
      price: "",
    },
  });

  const { reset } = form;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/booking/getbookone", {
          params: { bookingId: bookingId },
        });
        console.log(response.data);
        setBookings(response.data);

        // Update form default values with fetched data
        reset(response.data);
      } catch (error) {
        console.error("Error fetching booking data:", error);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id, reset,bookingId]);

  const onSubmit = async (values) => {
    try {
      console.log(values)
      const data = { ...values, userId: userId, bookingId: id };

      const response = await axios.put(
        "http://localhost:4000/api/booking/updatebook",
        data
      );

      toast.success("Succefully booking is created");
      router.push("/");
    } catch (err) {
      console.log("Failed to create new booking", err);
      toast.error("Something went wrong!");
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white rounded shadow-md max-w-2xl w-full">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Lets give some details for your booking
        </h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="John Doe"
                      {...field}
                      className="w-full"
                      
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="+1234567890"
                      {...field}
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="hotelName"
              render={({ field }) => (
               <FormItem>
                  <FormLabel>Hotel Name</FormLabel>
                  <FormControl>
                    <Input
             
                      placeholder="Hotel can not be changed"
                      {...field}
                      className="w-full"
                       disabled={true}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="checkIn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Check-In</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} className="w-full" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="checkOut"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Check-Out</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} className="w-full" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="example@domain.com"
                      {...field}
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="adults"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Adults</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} className="w-full" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="children"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Children</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} className="w-full" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rooms"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rooms</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} className="w-full" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      {...field}
                      className="w-full"
                      disabled={true}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="col-span-full">
              <Button type="submit" className="w-full">
                Update
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default EditBooking;
