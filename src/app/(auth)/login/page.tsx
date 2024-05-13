import LogInForm from "./login-form";

export default function LoginPage () {
    return (
        <div className="flex justify-center h-screen bg-slate-600 items-center relative overflow-hidden">
            <div className="w-full py-5 max-w-xl rounded-xl relative z-10 2xl:p-16 xl:p-12 p-0 m-4 ">
                <LogInForm />
            </div>
        </div>
    );
}
