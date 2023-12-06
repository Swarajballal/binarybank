import { useState, useEffect } from "react";
import Container from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { HeartHandshake } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import  HeroBannerLoading  from "@/components/ui/herobannerloading";
import { useNavigate } from "react-router-dom";
import Proudcts from "./ui/products";
import { useRecoilValue } from "recoil";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { userEmailState } from "@/store/selectors/userEmailSelector";
import { isUserLoading } from "@/store/selectors/isLoadingSelector";

const Home = () => {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const userEmail = useRecoilValue(userEmailState);
  const isLoading = useRecoilValue(isUserLoading);

  useEffect(() => {
    if (!isLoading) {
      // console.log(userEmail);
      if (userEmail !== null) {
        toast.dismiss(); // Dismiss any existing toasts
        toast.success(`Welcome ${userEmail}`,{
          theme: "colored",
          position: toast.POSITION.TOP_CENTER
        });
      } else {
        toast.dismiss(); // Dismiss any existing toasts
        toast.error('You are not logged in',
        { 
          theme: "colored",
          position: toast.POSITION.TOP_CENTER
        }
        );
      }
    }
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  },[userEmail, isLoading]);

  return (
    <Container>
       {loading ? (
        <HeroBannerLoading />
      ) : (
      <div className="space-y-10">
        <div className="p-4 sm:p-6 lg:p-8 rounded-lg overflow-hidden">
        <div className={`rounded-lg relative aspect-square md:aspect-[2.4/1] overflow-hidden bg-cover bg-center`}
          style={{ backgroundImage: "url('/hero-banner.jpg')" }}
          onLoad={() => setImgLoaded(true)}
      >
            {!imgLoaded && <Skeleton />}
            <div className="h-full w-full flex flex-col justify-center items-center text-center gap-y-8">
              <div className="font-bold text-3xl sm:text-5xl lg:text-6xl sm:max-w-xl max-w-xs text-black dark:text-white bg-secondary/60 p-4 rounded-lg">
                <p className="text-4xl text-foreground">Welcome to Binary Bank</p>
                <p className="text-xl fill-muted text-muted-foreground">Sab ka Vikas</p>
                <Button size="lg" className="w-fit py-6 text-xl" onClick={() => {
                    navigate("/signin");
                }}>
                  <HeartHandshake className="mr-2" />
                  Click here to start 
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      )}
      <ToastContainer />
      <Proudcts/>
    </Container>
  );
};

export default Home;
