"use client";

import { Button } from "../../../components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";
import { Input } from "../../../components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import axios from "axios";
import { useRouter } from "next/navigation";
const formSchema = z.object({
  password: z.string(),
  email: z.string().email({ message: "Invalid email address." }),
});

const SignIn = () => {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      email: "",
    },
  });

  const onSubmit = async (values) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/auth/login",
        values
      );

      const { token, user } = response.data;
      console.log(response.data.user.bookings);
      localStorage.setItem(
        "userBookings",
        JSON.stringify(response.data.user.bookings)
      );
      localStorage.setItem("accessToken", token);

      localStorage.setItem("userId", user.id);
      localStorage.setItem("username", user.name);

      toast.success("Successfully signed in");

      router.push(`/bookForm/${user.id}/booking`);
    } catch (err) {
      console.log("Failed to create new user", err);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-1/2 p-6 bg-white rounded shadow-md max-w-2xl ">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Let s Sign-In before continue....
        </h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-1  gap-4"
          >
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
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} className="w-full" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="col-span-full">
              <Button type="submit" className="w-full">
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default SignIn;
