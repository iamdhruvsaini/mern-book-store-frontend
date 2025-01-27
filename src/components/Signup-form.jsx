import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContex";
import Swal from "sweetalert2";

export function SignupForm({
  className,
  ...props
}) {

  const { register, handleSubmit, formState: { errors } } = useForm();
  const {registerUser,signInWithGoogle}=useAuth();
  const navigate=useNavigate();
  
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 1000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseleave = Swal.resumeTimer;
    }
  });

  //register user
  const onSubmit = async (data) => {
    try {
      await registerUser(data.email,data.password);
      alert("Registered");
    } catch (error) {
      Toast.fire({
        icon: 'error',
        text: "Wrong Email or Password",
      });
    }
  }

  const handleGoogleSignIn=async ()=>{
    try {
      await signInWithGoogle();
      alert("Login Successfull");
      navigate("/");

    } catch (error) {
      console.log(error);
    }
  }

  return (
    (<div className={cn("flex flex-col gap-4", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Register Now</CardTitle>
          <CardDescription>
            Sign Up with your Google account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
            <div className="grid gap-4">
              <div className="flex flex-col gap-2">
                <Button variant="outline" className="w-full py-3" onClick={handleGoogleSignIn}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor" />
                  </svg>
                  Login with Google
                </Button>
              </div>
              <div
                className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email" >Email</Label>
                  <Input id="email" type="email" placeholder="m@example.com" required  {...register("email",{required:true})}/>
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                  </div>
                  <Input id="password" type="password" required {...register("password",{required:true})} />
                </div>
                <Button type="submit" className="w-full py-3">
                  Sign Up
                </Button>
              </div>
              <div className="text-center text-sm">
                Already have an account?{" "}
                <Link to={'/login'} className="underline underline-offset-4">
                  Login
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <div
        className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>)
  );
}
