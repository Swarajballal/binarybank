import * as React from "react";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const navigate = useNavigate();
  const [isEmailPasswordLoading, setIsEmailPasswordLoading] = React.useState<boolean>(false);
  const [isPasswordVisible, setIsPasswordVisible] = React.useState<boolean>(false);
  const [loginFormData, setLoginFormData] = React.useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Input changed:", e.target.value);
    setLoginFormData({
      ...loginFormData,
      [e.target.name]: e.target.value
    });
  };

  const togglePasswordVisibility = React.useCallback(() => {
    setIsPasswordVisible((prevIsPasswordVisible) => !prevIsPasswordVisible);
  }, []);

  async function onSubmitEmailPassword(event: React.SyntheticEvent) {
    event.preventDefault();
  
    try {
      setIsEmailPasswordLoading(true);
      console.log('Sending request...');
      const response = await axios.post(
        `${import.meta.env.VITE_APP_API_BASE_URL}/api/user/login`,
        {
          email: loginFormData.email,
          password: loginFormData.password
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
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmitEmailPassword}>
        <div className="grid gap-4">
          <div className="grid gap-4">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isEmailPasswordLoading}
              onChange={handleChange}
              value={loginFormData.email}
              name="email"
            />
            <Label className="sr-only" htmlFor="password">
              Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                placeholder="password"
                type={isPasswordVisible ? "text" : "password"}
                autoCapitalize="none"
                autoComplete="current-password"
                autoCorrect="off"
                disabled={isEmailPasswordLoading}
                onChange={handleChange}
                value={loginFormData.password}
                name="password"
              />
              <Button
                variant="ghost"
                size="icon"
                type="button"
                aria-label="Toggle Password Visibility"
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
                onClick={togglePasswordVisibility}
              >
                {isPasswordVisible ? (
                  <EyeOff className="h-6 w-6" />
                ) : (
                  <Eye className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>
          <Button disabled={isEmailPasswordLoading}>
            {isEmailPasswordLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign In with Email
          </Button>
          <p className="mt-2 text-xs text-center text-gray-700 mb-2"> Don't have an account? <span onClick={() => {navigate('/signup')}} className="text-blue-600 hover:underline cursor-pointer">Sign Up</span>
          </p>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button variant="outline" type="button"  disabled={isEmailPasswordLoading}>
        {isEmailPasswordLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.gitHub className="mr-2 h-4 w-4" />
        )}{" "}
        Github
      </Button>
    </div>
  );
}
