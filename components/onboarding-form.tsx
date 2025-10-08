"use client";

import { userSchema } from "@/lib/schema";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { countryList } from "@/utils/countriesList";
import { industryTypesList, roleList } from "@/utils";
import { Textarea } from "./ui/textarea";
import { toast } from "sonner";
import { createUser } from "@/app/actions/user";
import { useRouter } from "next/navigation";

interface Props {
  name: string;
  email: string;
  image?: string;
  redirectTo?: string;
}

export type UserDataType = z.infer<typeof userSchema>;

const OnboardingForm = ({ name, email, image, redirectTo }: Props) => {
  const [pending, setPending] = useState(false);
  const router = useRouter();

  const form = useForm<UserDataType>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: name || "",
      about: "",
      email: email,
      image: image || "",
      role: "",
      industryType: "",
      country: "",
    },
  });

  const onSubmit = async (data: UserDataType) => {
    try {
      setPending(true);
      const result = await createUser(data, redirectTo);
      
      if (result.success) {
        toast.success("Onboarding completed successfully!");
        // Add a small delay to ensure database transaction is committed
        setTimeout(() => {
          if (result.redirectTo) {
            router.push(result.redirectTo);
          }
        }, 500);
      } else {
        toast.error(result.error || "Something went wrong");
      }
    } catch (error) {
      console.log(error);
      toast.error("Network error. Please check your connection and try again.");
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Form {...form}>
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Welcome to DailyTM</CardTitle>
            <CardDescription>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select country" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {countryList.map((country) => (
                            <SelectItem key={country.code} value={country.name}>
                              <div className="flex flex-row items-center">
                                <img
                                  src={country.flag}
                                  alt={country.name}
                                  className="w-4 h-3"
                                />
                                <p className="pl-2"> {country.name}</p>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="industryType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Industry Type</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select industry" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {industryTypesList.map((industry) => (
                              <SelectItem key={industry} value={industry}>
                                {industry}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role at Organization</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select role" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {roleList.map((role) => (
                              <SelectItem key={role} value={role}>
                                {role}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="about"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bio</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Tell us about yourself"
                        className="resize-none"
                      ></Textarea>
                    </FormControl>
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                disabled={pending}
                className="cursor-pointer w-full"
              >
                Submit
              </Button>
            </form>
          </CardContent>
        </Card>
      </Form>
    </div>
  );
};

export default OnboardingForm;
