// app/dashboard/page.js (example route)
'use client'

import { useEffect, useState } from 'react'

import { supabase } from '@/lib/supabase'

export default function Dashboard() {
  const [conversations, setConversations] = useState([])

  useEffect(() => {
    const fetchConversations = async () => {
      const { data, error } = await supabase
        .from('conversations')
        .select('*')
        .eq('user_id', 'your-user-id-here') // replace with logged-in user's ID
        .order('updated_at', { ascending: false })

      if (error) console.error(error)
      else setConversations(data)
    }

    fetchConversations()
  }, [])

  return (
    <div>
      <h1>Your Conversations</h1>
      <ul>
        {conversations.map(conv => (
          <li key={conv.id}>{conv.customer_name} ({conv.platform})</li>
        ))}
      </ul>
    </div>
  )
}
