# 🧠 AI Chatbot with PDF Upload - Full Stack Assignment

This is a full-stack chatbot application built with **Next.js**, **Supabase** authentication, and the **Gemini API** for processing PDF documents and user input. Users can upload a PDF, chat with its content, and have their interactions stored in a relational database.

---

## 🚀 Features

- 🔐 User Authentication (Login/Register) via Supabase
- 📄 PDF Upload & Parsing
- 🤖 Gemini API Integration for Chat
- 💬 Chat Interface using React
- 🗃️ Chat History Storage in PostgreSQL


---

## 🛠 Tech Stack

- **Frontend:** Next.js, React, Tailwind CSS
- **Backend:** API Routes (Next.js), Gemini API
- **Authentication:** Supabase (JWT)
- **Database:** Supabase
- **PDF Parsing:** `pdf-parse` 

---


## 🗃️ Database Setup

Run the SQL file `/database/setup.sql` to create the `chat` table in any Supabase (PostgreSQL) environment.

```bash
psql < setup.sql

```
## 🧪 How to Run Locally

### 1. Clone the Repo

```bash
git clone https://github.com/Fahimkhan9/gemin-chatbot.git
cd chatbot-assignment
```
### 2. Install Dependencies
```bash
npm install
```
### 3.Setup Environment Variables
Create a `.env.local` file in the root with the following:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
GEMINI_API_KEY=your_gemini_api_key
```
