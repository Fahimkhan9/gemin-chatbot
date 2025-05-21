'use client';

import useSWR from 'swr';
import axios from 'axios';

type ChatMessage = {
  id: string;
  user_id: string;
  role: string;
  content: string;
  created_at: string;
};

const fetcher = (url: string) => axios.get(url).then(res => res.data.messages);

export function useChats() {
  const { data, error, isLoading, mutate } = useSWR<ChatMessage[]>(
    '/api/chat',
    fetcher,
    {
      refreshInterval: 3000, // Re-fetch every 3 seconds
      revalidateOnFocus: true, // Re-fetch on window focus
    }
  );


  return {
    chats: data || [],
    isLoading,
    isError: error,
    refresh: mutate, // Expose mutate for manual refresh
  };
}
