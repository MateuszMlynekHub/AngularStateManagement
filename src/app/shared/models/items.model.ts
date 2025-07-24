export interface Item {
  id: number
  name: string
  price: number
  rate: number
  rateCount: number
  category: Category
  manufacturer: Manufacturer
  stock: Stock[]
  tags: string[]
  details: Detail[]
  shippingPrice: number
}

export interface Category {
  id: number
  name: string
  description: string
}

export interface Manufacturer {
  id: number
  name: string
  country: string
}

export interface Stock {
  warehouse: string
  quantity: number
}

export interface Detail {
  code: string
  value: string
}

export const item = 
  {
    id: 1,
    name: "Smartphone X",
    price: 999.99,
    rate: 4,
    rateCount: 120,
    category: {
      id: 5,
      name: "Electronics",
      description: "Devices and gadgets"
    },
    manufacturer: {
      id: 3,
      name: "TechCorp",
      country: "USA"
    },
    stock: [
      { warehouse: "New York", quantity: 150 },
      { warehouse: "Los Angeles", quantity: 230 },
      { warehouse: "Chicago", quantity: 180 }
    ],
    shippingPrice: 0,
    tags: ["electronics", "smartphone", "tech"],
    details: [
      { code: "Screen", value: "6.1'" },
      { code: "Processor", value: "Processor X" },
      { code: "RAM", value: "8GB" },
      { code: "Internal Storage", value: "128GB" },
    ],
}