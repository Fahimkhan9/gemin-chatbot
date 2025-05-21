'use client'

import { useChats } from '@/hooks/useChats'
import axios from 'axios'
import React, { useState, useRef, useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import ReactMarkdown from 'react-markdown'
interface ChatMessage {
    sender: 'user' | 'bot'
    text: string
}

export default function ChatBox() {
    const [input, setInput] = useState('')
    const [loading, setLoading] = useState(false)
    const [pdfUploading, setPdfUploading] = useState(false)
    const messagesEndRef = useRef<HTMLDivElement>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)

  
    // load all chats with polling
    const { chats, isLoading, isError, refresh } = useChats()
      // Scroll chat to bottom on new messages or loading
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [chats, loading, pdfUploading])
    // sends user prompt to backend api.api send prompt to gemini and stores it in database.
    async function sendMessage() {
        const userMessage = input.trim()
        if (!userMessage) return

        
      
        setInput('')
        setLoading(true)

        try {
            await axios.post('/api/chat', { message: userMessage })
            refresh()



        } catch (error) {
        
            toast.error('Error: Could not get response')

        } finally {
            setLoading(false)
        }
    }
    // suuport send with enter button press
    function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            sendMessage()
        }
    }
    // upload pdf to backend api for extracting text
    async function handlePdfUpload(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0]
        if (!file) return

        setPdfUploading(true)
        try {
            const formData = new FormData()
            formData.append('file', file)
           const res=await axios.post('/api/pdf-extract',formData)

            if (res.data.text) {
                setInput(res.data.text)
                toast.success("Extracted text from pdf")
            } else {
                toast.error("Failed to process PDF.")
                
            }
        } catch (error) {
           
            toast.error("Error uploading PDF.")

     
        } finally {
            setPdfUploading(false)
            if (fileInputRef.current) fileInputRef.current.value = ''
        }
    }

    return (
        <div className="flex flex-col h-screen max-w-2xl mx-auto bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md shadow-md">
            <div className="px-6 py-4 border-b border-gray-300 dark:border-gray-700 font-semibold text-lg text-gray-900 dark:text-gray-100">
                Chatbot
            </div>
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 bg-gray-50 dark:bg-gray-800">
                {
                    isLoading ? <div className="flex flex-row justfiy-center items center"><div className="loading loading-lg"></div></div>
                        :
                        isError ? <div><p className='text-red-600'>Error Loading Chats</p></div>
                            :
                            chats.map((msg, i) => (
                                <div
                                    key={i}
                                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-[75%] px-4 py-2 rounded-lg whitespace-pre-wrap break-words
                                              ${msg.role === 'user'
                                                ? 'bg-blue-600 text-white rounded-br-none'
                                                : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-bl-none'
                                            }
              `}
                                    >
                                        <ReactMarkdown children={msg.content} />
                                    </div>
                                </div>
                            ))
                }

                {(loading || pdfUploading) && (
                    <div className="flex justify-start space-x-2">
                        <div className="w-3 h-3 bg-gray-400 rounded-full animate-bounce animation-delay-0"></div>
                        <div className="w-3 h-3 bg-gray-400 rounded-full animate-bounce animation-delay-150"></div>
                        <div className="w-3 h-3 bg-gray-400 rounded-full animate-bounce animation-delay-300"></div>
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            <div className="border-t border-gray-300 dark:border-gray-700 p-4 bg-white dark:bg-gray-900 flex items-center gap-2">
                <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    rows={10}
                    placeholder="Type your message here..."
                    className="flex-grow resize-none rounded-md border border-gray-300 dark:border-gray-700 px-4 py-2 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    style={{ minHeight: '38px', maxHeight: '150px' }}
                    disabled={loading || pdfUploading}
                />

                <input
                    type="file"
                    accept="application/pdf"
                    onChange={handlePdfUpload}
                    className="hidden"
                    ref={fileInputRef}
                    disabled={loading || pdfUploading}
                />

                <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={loading || pdfUploading}
                    className="px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-green-300"
                    title="Upload PDF"
                >
                    📄
                </button>

                <button
                    onClick={sendMessage}
                    disabled={loading || pdfUploading || input.trim() === ''}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300"
                >
                    Send
                </button>
            </div>

            <style>{`
        .animate-bounce {
          animation: bounce 1.4s infinite ease-in-out both;
        }
        .animation-delay-0 {
          animation-delay: 0s;
        }
        .animation-delay-150 {
          animation-delay: 0.15s;
        }
        .animation-delay-300 {
          animation-delay: 0.3s;
        }
        @keyframes bounce {
          0%, 80%, 100% {
            transform: scale(0);
          }
          40% {
            transform: scale(1);
          }
        }
      `}</style>
        </div>
    )
}
