"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
// import { redirect } from "next/dist/server/api-utils";

export async function signOut() { 
    const supabase = await createClient();
    await supabase.auth.signOut();
    revalidatePath('/');
    redirect('/');
}