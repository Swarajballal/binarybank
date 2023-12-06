import { useState, useEffect } from "react";
import Container from "@/components/ui/container";
import ProductList from "@/components/ui/ProductList";
import Loading from "@/components/ui/Loading";
import { Product } from '../../../types';

const productsData = [
  {
    id: "1",
    category: "Debit Card",
    name: "Visa",
    price: "$3.9.00",
    images: ["/image1.png"],
  },
  {
    id: "2",
    category: "Credit Card",
    name: "Platinum",
    price: "$3.00",
    images: ["/image2.png"],
  },
  {
    id: "3",
    category: "Business Card",
    name: "Rupay",
    price: "$1.5",
    images: ["/image4.png"],
  },
  {
    id: "4",
    category: "Health Card",
    name: "Platinum Plus",
    price: "$2.3",
    images: ["/image5.png"],
  }
];


const Proudcts = () => {

  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Simulate a data fetch with a timeout
    setTimeout(() => {
      setProducts(productsData);
      setLoading(false);
    }, 2000); // 2 second delay
  }, []);

  return (
    <Container>
       {loading ? (
        <Loading />
      ) : (
      <div className="pb-16">
        <div className="p-4 sm:p-6 lg:p-8 rounded-lg overflow-hidden">
        </div>
        <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
           <ProductList items={products} />     
        </div>
      </div>
      )}
    </Container>
  );
};

export default Proudcts;