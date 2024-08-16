'use server'
import * as z from 'zod'
import { ContactUsSchema } from '@/schemas';
import { sendMessage } from "@/lib/mail";

export const contact_form= async(values:z.infer<typeof ContactUsSchema>)=>{
    const validatedFields= ContactUsSchema.safeParse(values)
    if(!validatedFields.success){
        return {error:"Invalid fields"}
    }
    const {email,message} = validatedFields.data
   await sendMessage(email,message);
   return {succes:"Message sent"}

}