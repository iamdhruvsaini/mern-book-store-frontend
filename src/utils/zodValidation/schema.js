import {z} from "zod";

export const formSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email format"),
    address: z.object({
      city: z.string().min(1, "City is required"),
      country: z.string().min(1, "Country is required"),
      state: z.string().min(1, "State is required"),
      zipcode: z.string().min(1, "Zipcode is required"),
    }),
  
    phone: z.number().min(1000000000, "Phone number must be at least 10 digits"), // Ensuring it has a reasonable phone number length (10 digits)
  
    productsIds: z.array(z.string()), // If ObjectId is a string in your case
  
    totalPrice: z.number().positive("Total price must be a positive number"),
  });