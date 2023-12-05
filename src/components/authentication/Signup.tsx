import React, { useEffect } from "react"
import { Button } from "@/components/ui/button"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Icons } from "@/components/icons"

export default function SignUpForm() {
    const navigate = useNavigate();
    const [isEmailPasswordLoading, setIsEmailPasswordLoading] = React.useState<boolean>(false);
    const [signupFormData, setSignupFormData] = React.useState({
        username: "",
        email: "",
        password: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // console.log("Input changed:", e.target.value);
        setSignupFormData({
            ...signupFormData,
            [e.target.name]: e.target.value
        });
    };


    useEffect(() => {
      
    })


    async function onSubmitSignup(event: React.SyntheticEvent) {
        event.preventDefault();
        try {
            setIsEmailPasswordLoading(true);
            console.log('Sending request...');
            const response = await axios.post(
                `${import.meta.env.VITE_APP_API_BASE_URL}/api/user/signup`,
                {
                    username: signupFormData.username,
                    email: signupFormData.email,
                    password: signupFormData.password
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            console.log('Response received:', response.data);
            const token = response.data.token;
            localStorage.setItem('token', token);
            navigate('/');
          } catch (error) {
            console.error('Error:', error);
          } finally {
            setIsEmailPasswordLoading(false);
            console.log('Request completed.');
          }
    }


  return (
    <div className="relative flex flex-col justify-center items-center min-h-screen overflow-hidden">
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover hidden md:block"
      >
        <source src="signup_bg.mp4" type="video/mp4" />
      </video>
      <div className="w-full m-auto lg:max-w-lg relative z-10">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">
              Create an account
            </CardTitle>
            <CardDescription className="text-center">
              Enter your username email and password to sign up
            </CardDescription>
          </CardHeader>
        <form onSubmit={onSubmitSignup}>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
            <Label className="sr-only" htmlFor="Username">Username</Label>
              <Input 
                id="username"
                placeholder="Unique username"
                type="text"
                autoCapitalize="none"
                autoComplete="none"
                autoCorrect="off"
                disabled={isEmailPasswordLoading}
                onChange={handleChange}
                value={signupFormData.username}
                name="username"  />
            </div>
            <div className="grid gap-2">
            <Label className="sr-only" htmlFor="email">Email</Label>
              <Input 
                id="email"
                placeholder="name@example.com"
                type="email"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                disabled={isEmailPasswordLoading}
                onChange={handleChange}
                value={signupFormData.email}
                name="email" 
                />
            </div>
            <div className="grid gap-2">
            <Label className="sr-only" htmlFor="password">Password</Label>
              <Input 
                id="password"
                placeholder="Password"
                type="text"
                autoCapitalize="none"
                autoComplete="current-password"
                autoCorrect="off"
                disabled={isEmailPasswordLoading}
                onChange={handleChange}
                value={signupFormData.password}
                name="password" />
            </div>
            <span className=" text-blue-600 hover:underline text-sm">
              Forget password ?
            </span>
          </CardContent>
          <CardFooter className="flex flex-col">
          <Button disabled={isEmailPasswordLoading}>
            {isEmailPasswordLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign Up
          </Button>
          </CardFooter>
        </form>  
          <div className="relative mb-2">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6 m-2">
          <Button variant="outline" type="button"  disabled={isEmailPasswordLoading}>
            {isEmailPasswordLoading ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            ) : (
            <Icons.gitHub className="mr-2 h-4 w-4" />
            )}{" "}
            Github
         </Button>
            <Button variant="outline" type="button"  disabled={isEmailPasswordLoading}>
            {isEmailPasswordLoading ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            ) : (
            <Icons.twitter className="mr-2 h-4 w-4" />
            )}{" "}
            Twitter
         </Button>
          </div>
          <p className="mt-2 text-xs text-center text-gray-700 mb-2">
            {" "}
            Already have an account?{" "}
            <span className=" text-blue-600 hover:underline cursor-pointer" onClick={() => {
                navigate('/signin');
            }}>
                Sign In
            </span>
          </p>
        </Card>
      </div>
    </div>
  )
}