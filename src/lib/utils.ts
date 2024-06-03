import { type ClassValue, clsx } from "clsx"
import mongoose from "mongoose"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function connectDB(){
  try {
    if (mongoose.connections && mongoose.connections[0].readyState) {
      return
    }
   await mongoose.connect(process.env.MONGO_URI as string)
   console.log("DB connected");
  } catch (error) {
   console.log("DB not connected");  
  }
}