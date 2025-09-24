import { Product } from "@/types/product";

export const sampleProducts: Product[] = [
  {
    id: 1,
    title: "Mens Cotton Jacket",
    price: 55.99,
    description:
      "Great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking...",
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png", // Placeholder for now
    category: "men's clothing",
    rating: {
      rate: 4.2,
      count: 85,
    },
  },
  {
    id: 2,
    title: "Women's Short Sleeve",
    price: 7.95,
    description:
      "100% Polyester, Machine wash, 100% cationic polyester interlock, Machine Wash & Pre Shrunk...",
    image: "https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_t.png",
    category: "women's clothing",
    rating: {
      rate: 4.5,
      count: 120,
    },
  },
  {
    id: 3,
    title: "Mens Cotton Jacket",
    price: 55.99,
    description:
      "Great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking...",
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png",
    category: "men's clothing",
    rating: {
      rate: 4.0,
      count: 95,
    },
  },
  {
    id: 4,
    title: "Women's Short Sleeve",
    price: 7.95,
    description:
      "100% Polyester, Machine wash, 100% cationic polyester interlock, Machine Wash & Pre Shrunk...",
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png",
    category: "women's clothing",
    rating: {
      rate: 4.3,
      count: 110,
    },
  },
  {
    id: 5,
    title: "Premium Cotton Shirt",
    price: 39.99,
    description: "Comfortable cotton shirt perfect for casual wear",
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png",
    category: "men's clothing",
    rating: {
      rate: 4.1,
      count: 75,
    },
  },
  {
    id: 6,
    title: "Elegant Blouse",
    price: 45.99,
    description: "Sophisticated blouse for professional settings",
    image: "https://fakestoreapi.com/img/61mtL65D4cL._AC_SX679_t.png",
    category: "women's clothing",
    rating: {
      rate: 4.4,
      count: 88,
    },
  },
];

export const getProductsByCategory = (
  category: "men's clothing" | "women's clothing"
) => {
  return sampleProducts
    .filter((product) => product.category === category)
    .sort((a, b) => b.id - a.id); // Latest to oldest by id
};

export const getTopRatedProducts = () => {
  return sampleProducts
    .filter((product) => product.rating.rate >= 4.0)
    .sort((a, b) => b.rating.rate - a.rating.rate); // Highest rated first
};
