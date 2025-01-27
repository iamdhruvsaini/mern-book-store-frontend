import React from 'react'


import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form";
import axios from 'axios';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { cn } from '@/lib/utils'
import getBaseURL from '@/utils/baseURL';

export function AdminLoginForm({
  className,
  ...props
}) {

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


  const { register, handleSubmit, formState: { errors } } = useForm();
  
  const navigate=useNavigate();

  const onSubmit = async(data)=>{
    try {
      const response=await axios.post(`${getBaseURL()}/api/auth/admin`,data,{
        headers:{
            'Content-Type':'application/json',
        }
      })
      const auth=response.data;
      if(auth.token){
        localStorage.setItem('token',auth.token);
        setTimeout(()=>{
            localStorage.removeItem('token');
            alert("Token is Expired! Login Again");
        },3600 * 1000);
      }
      alert("Admin Login Successfull");
      navigate("/dashboard");
      
    } catch (error) {
        console.log(error)
      Toast.fire({
        icon: 'error',
        text: "Wrong Username or Password",
      });
    }
  }

  

  return (
    (<div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Admin Dashboard Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
            <div className="grid gap-6">
              
             
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="username" >Username</Label>
                  <Input id="username" type="text" required  {...register("username",{required:true})}/>
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                  </div>
                  <Input id="password" type="password" required {...register("password",{required:true})} />
                </div>
                <Button type="submit" className="w-full py-3">
                  Login
                </Button>
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
