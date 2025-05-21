import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenAI } from '@google/genai'
import { createClient } from '@/supabase/server'

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! })

export async function POST(req: NextRequest){
    const supabase = await createClient()
    try {
        const { message, } = await req.json()
        const { data: { user },error:authError } = await supabase.auth.getUser()
        if(authError || !user){
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401})

        }
        if (!message) {
            return NextResponse.json({ error: 'Missing message or context' }, { status: 400 })
        }

        const prompt = `Chat with user: ${message}`

        const response = await ai.models.generateContent({
            model: 'gemini-2.0-flash', // or your preferred model
            contents: prompt,
        })
        
        
        const { error } = await supabase.from('chat').insert([
            {
                user_id: user?.id,
                role: 'user',
                content: message,

            },
            {
                user_id: user?.id,
                role: 'bot',
                content: response && response.candidates && response.candidates[0] && response.candidates[0].content && response.candidates[0].content.parts && response.candidates[0].content.parts[0] && response.candidates[0].content.parts[0].text
                    ? response.candidates[0].content.parts[0].text
                    : '',
            }
        ]);

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ message: 'Chat message saved' }, { status: 201 });
    } catch (error) {
        console.error('Gemini API error:', error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}


export async function GET(req: NextRequest) {
  try {
    const supabase=await createClient()

     const { data: { user },error:authError } = await supabase.auth.getUser()
     
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    
    let query = supabase
      .from('chat')
      .select('*')
      .eq('user_id',user?.id)
      // .order('created_at', { ascending: true });

    
    

    const { data, error } = await query;
  
    
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ messages: data }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}