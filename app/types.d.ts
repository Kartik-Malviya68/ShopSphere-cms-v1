namespace ProductForm {
  interface Product {
    _id: string;
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
