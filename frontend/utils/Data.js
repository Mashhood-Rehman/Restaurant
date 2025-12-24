import { IMAGES } from "../src/assets/Images";

// data.js
export const navbarSections = [
    { name: "Home", id: "hero" },
    { name: "Menu", id: "Product" },
    { name: "Reservation", id: "Reservation" },
    { name: "FeedBack", id: "Contact" },
  ];
  

  export const tabs = [
    { id: "Cart", label: "Special Deals", imageUrl: "deals.jpeg" },
    { id: "Fast", label: "Fast Food", imageUrl: "https://imgs.search.brave.com/0KDrhakNsEnzTgKwMi6Eqm5JjMdPrs7L05mb_mct0QM/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvNTI0/Mzg3NzAyL3Bob3Rv/L2J1cmdlci1wbGFp/bi5qcGc_cz02MTJ4/NjEyJnc9MCZrPTIw/JmM9VzlsS096TXNw/UGpGTEpIQ1NzZGd3/RUFxRFp4ZzQ5Z1VU/MFZuU09pY2xQOD0" },
    { id: "Desi", label: "Desi", imageUrl: "Karahi.jpeg" },
    { id: "Chinese", label: "Chinese", imageUrl: "Noodles.jpeg" },
    { id: "Dessert", label: "Desserts", imageUrl: "barfi.jpeg" },
    { id: "drink", label: "Drinks", imageUrl: "coke.jpeg" },
  ];

  export const carouselImages = [
    IMAGES.HEROCAROUSEL2,
    IMAGES.HEROCAROUSEL1,
    IMAGES.HEROCAROUSEL3,
  ]


   export const products = [
      { _id: '1', name: 'Margherita Pizza', category: 'Pizza', price: '$12.99', quantity: 25, status: 'In Stock' },
      { _id: '2', name: 'Pepperoni Pizza', category: 'Pizza', price: '$14.99', quantity: 18, status: 'In Stock' },
      { _id: '3', name: 'Cheese Burger', category: 'Burgers', price: '$9.99', quantity: 32, status: 'In Stock' },
      { _id: '4', name: 'Veggie Burger', category: 'Burgers', price: '$8.99', quantity: 15, status: 'In Stock' },
      { _id: '5', name: 'Spaghetti Carbonara', category: 'Pasta', price: '$11.99', quantity: 8, status: 'Low Stock' },
      { _id: '6', name: 'Penne Arrabbiata', category: 'Pasta', price: '$10.99', quantity: 20, status: 'In Stock' },
      { _id: '7', name: 'Caesar Salad', category: 'Salads', price: '$7.99', quantity: 12, status: 'In Stock' },
      { _id: '8', name: 'Greek Salad', category: 'Salads', price: '$8.49', quantity: 0, status: 'Out of Stock' },
    ];
  
  export   const headers = [
      { key: 'name', label: 'Product Name' },
      { key: 'category', label: 'Category' },
      { key: 'price', label: 'Price' },
      { key: 'amount', label: 'Quantity' },
      { key: 'status', label: 'Status' },
        { key: "actions", label: "Actions" },
    ];
  