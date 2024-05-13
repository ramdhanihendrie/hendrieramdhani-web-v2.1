"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { Button, Field, Fieldset } from "@headlessui/react";
import { SiteLogo } from "@/components/svg";
import Label from "@/components/ui/label";
import InputError from "@/components/ui/inputError";
import Input from "@/components/ui/input";
import Alert from "@/components/ui/alert";
import { signIn } from "next-auth/react";

const LogInForm = () => {
    const router = useRouter()
    const [loginError, setLoginError] = useState("");

    const schema = z.object({
        email: z.string().min(1, { message: "Email is required" }).email({ message: "Your email is invalid." }),
        password: z.string().min(8),
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
            email: "",
            password: "",
        },
    });

    const onSubmit = (data: any) => {
        signIn("credentials", {
            email: data.email,
            password: data.password,
            redirect: false,
            callbackUrl: "/"
        }).then((res) => {
            if (!res?.error) {
                reset();
                router.push('/dashboard');
            } else if (res?.error === "CredentialsSignin") {
                setLoginError("Invalid Email/Password")
            } else {
                setLoginError("Error")
            }
        });
    };

    return (
        <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
            <Link href="/" className="flex justify-center">
                <SiteLogo className="w-24 h-24 fill-current text-primary" />
            </Link>
            <h4 className="card-title block !text-center">Welcome Back!</h4>
                <p className="text-center text-sm">
                    Sign in to your account.
                </p>
                { loginError && (<Alert type="alert-error">{loginError}</Alert>) }
                
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Fieldset className="flex flex-col gap-2">
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
                    </Fieldset>

                    <div className="mt-5">
                        <Button type="submit" className="btn btn-primary w-full">
                            Sign In
                        </Button>
                    </div>
                </form>

                <div className="mt-6 text-center">
                    Don't have an account?{" "}
                    <Link href="/register" className="text-primary underline">
                        Sign Up
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default LogInForm