"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { Button, Field, Fieldset } from "@headlessui/react";
import { SiteLogo } from "@/components/svg";
import Label from "@/components/ui/label";
import Input from "@/components/ui/input";
import InputError from "@/components/ui/inputError";
import Alert from "@/components/ui/alert";

const SignUpForm = () => {
    const router = useRouter()
    const [registError, setRegistError] = useState("");

    const schema = z.object({
        name: z.string().min(1, { message: "Name is required" }),
        email: z.string().min(1, { message: "Email is required" }).email({ message: "Your email is invalid" }),
        password: z.string().min(8),
        password_confirmation: z.string().min(8),
    })
    .refine((data) => data.password === data.password_confirmation, {
        message: "Passwords don't match",
        path: ["password_confirmation"],
    });
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(schema),
        mode: "all",
        defaultValues: {
            name: "",
            email: "",
            password: "",
            password_confirmation: "",
        },
    });

    const onSubmit = (data: any) => {
        
        api.post('/register', JSON.stringify(data))
        .then((res) => {
            if(!res?.data.error){
                router.push('/login');
                reset();
            }
        })
        .catch((error) => {
            console.log(error)
            setRegistError(error.response.data.email[0])
        })
    };

    return (
        <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
                <Link href="/" className="flex justify-center">
                    <SiteLogo className="w-24 h-24 fill-current text-primary" />
                </Link>
                <h4 className="card-title block !text-center">Get Started!</h4>
                <p className="text-center text-sm">
                    Please complete to create your account.
                </p>
                { registError && (<Alert type="alert-error">{registError}</Alert>) }
                
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Fieldset className="flex flex-col gap-2">
                        <Field>
                            <Label>Name</Label>
                            <Input type="text" {...register("name")} />
                            { errors.name && (<InputError>{errors.name.message}</InputError>) }
                        </Field>

                        <Field>
                            <Label>Email</Label>
                            <Input type="text" {...register("email")} />
                            { errors.email && (<InputError>{errors.email.message}</InputError>) }
                        </Field>

                        <Field>
                            <Label>Password</Label>
                            <Input type="password" {...register("password")} />
                            { errors.password && (<InputError>{errors.password.message}</InputError>) }
                        </Field>

                        <Field>
                            <Label>Confirm Password</Label>
                            <Input type="password" {...register("password_confirmation")} />
                            { errors.password_confirmation && (<InputError>{errors.password_confirmation.message}</InputError>) }
                        </Field>
                    </Fieldset>

                    <div className="mt-5">
                        <Button type="submit" className="btn btn-primary w-full">
                            Sign Up
                        </Button>
                    </div>
                </form>

                <div className="mt-6 text-center">
                    Already Registered?{" "}
                    <Link href="/login" className="text-primary underline">
                        Sign In
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default SignUpForm