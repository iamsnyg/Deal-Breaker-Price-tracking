// import { createClient } from "@/utils/supabase/client";

import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    
    // return new Response(`OAuth callback received with code: ${code}`);

    if (code) {
        const supabase = await createClient();
        await supabase.auth.exchangeCodeForSession(code);
        
    }
    return NextResponse.redirect(new URL('/', request.url));
}