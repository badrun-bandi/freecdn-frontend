export interface ProductInterface {
  id: string;
  title: string;
  price: number;
  description: string;
  category: string;
  rating: RatingInterface;
  image: string;
}

export interface RatingInterface {
  rate: number;
  count: number;
}