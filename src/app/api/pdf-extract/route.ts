import { extractTextFromPDF } from '@/utils/pdfparser';
import { NextRequest, NextResponse } from 'next/server'


export const POST = async (req: NextRequest) => {
    try {
        const formData = await req.formData();
        const file: File | null = formData.get("file") as File;

        if (!file) return NextResponse.json({ error: "No file uploaded." }, { status: 400 });
       

        const buffer = Buffer.from(await file.arrayBuffer());
        const parsedtext = await extractTextFromPDF(buffer)

        return NextResponse.json({ text: parsedtext });
    } catch (error: any) {
        // console.error('PDF extract error:', error.message)
        return NextResponse.json({ error: 'Failed to extract text from PDF' }, { status: 500 })
    }
}
