namespace ProductForm {
  interface Product {
    name: string;
    brand: string;
    price: number;
    category: string;
    genderType: string;
    description: string;
    style: string;
    image: string[];
    color: string[];
    rating: {
      rating: string;
      ratingCount: string;
    };
  }
}
