import Container from "@/components/ui/container";
import { Skeleton } from "@/components/ui/skeleton";

const HeroBannerLoading = () => {
  return (
    <Container>
      <div className="w-full h-full p-8">
        <Skeleton className="w-full aspect-square rounded-xl md:aspect-[2.4/1]" />
      </div>
    </Container>
  );
}
 
export default HeroBannerLoading;
