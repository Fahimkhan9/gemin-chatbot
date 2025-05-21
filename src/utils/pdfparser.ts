import pdfParse from "pdf-parse";

export async function extractTextFromPDF(fileBuffer: Buffer): Promise<string> {
  const data = await pdfParse(fileBuffer);

  const cleanedText = data.text
    .replace(/\r/g, "") // remove carriage returns
    .replace(/\n{2,}/g, "\n\n") // keep paragraph spacing
    .replace(/[ \t]+\n/g, "\n") // remove trailing spaces before newline
    .replace(/\n[ \t]+/g, "\n") // remove leading spaces after newline
    .trim();

  return cleanedText;
}