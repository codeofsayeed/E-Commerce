// Mock data. Replace with Firestore later (see hooks/useProducts.js).
const names = [
  "Mortar Bowl",
  "Wireless Headphones",
  "Side Table",
  "Baseball Cap",
  "Wall Clock",
  "Backpack",
  "Sunglasses",
  "Coffee Table",
  "Classic Cap",
  "Basket",
  "Desk Clock",
  "Round Sunglasses",
];

export const products = Array.from({ length: 36 }, (_, i) => ({
  id: String(i + 1),
  name: names[i % names.length],
  price: [44, 49, 49, 34, 44, 69, 34, 49, 33, 34, 44, 47][i % 12],
  color: ["Black", "Red", "Green", "Grey", "Teal"][i % 5],
  category: `Category ${(i % 5) + 1}`,
  brand: `Brand ${(i % 5) + 1}`,
  badge:
    i === 0
      ? "New"
      : i === 4
        ? "New"
        : [1, 6, 7, 8].includes(i)
          ? "-10%"
          : null,
  image: "", // put image URL here (Firebase Storage URL later)
}));

export const categories = [
  "Category 1",
  "Category 2",
  "Category 3",
  "Category 4",
  "Category 5",
];
export const brands = ["Brand 1", "Brand 2", "Brand 3", "Brand 4", "Brand 5"];
export const colors = [
  { name: "Black", hex: "#111" },
  { name: "Red", hex: "#ff8686" },
  { name: "Green", hex: "#7ed321" },
  { name: "Grey", hex: "#b2b2b2" },
  { name: "Teal", hex: "#15cba8" },
];
export const priceRanges = [
  { label: "$0.00 - $9.99", min: 0, max: 9.99 },
  { label: "$10.00 - $19.99", min: 10, max: 19.99 },
  { label: "$20.00 - $29.99", min: 20, max: 29.99 },
  { label: "$30.00 - $39.99", min: 30, max: 39.99 },
  { label: "$40.00 - $69.99", min: 40, max: 69.99 },
];
