
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Search, MessageSquare } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface Conversation {
  id: string;
  participantId: string;
  participantName: string;
  participantRole: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
}

interface ConversationListProps {
  selectedConversationId: string | null;
  onSelectConversation: (conversationId: string) => void;
}

const ConversationList: React.FC<ConversationListProps> = ({ 
  selectedConversationId, 
  onSelectConversation 
}) => {
  const { user } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  useEffect(() => {
    if (!user) return;
    
    const fetchConversations = async () => {
      try {
        // First get all unique conversation partners
        const { data: messagePartners, error: partnersError } = await supabase
          .from('user_messages')
          .select(`
            sender_id,
            recipient_id,
            profiles!sender:sender_id(full_name),
            profiles!recipient:recipient_id(full_name)
          `)
          .or(`sender_id.eq.${user.id},recipient_id.eq.${user.id}`);
            
        if (partnersError) throw partnersError;
        
        // Create a Set of unique conversation partners
        const uniquePartners = new Set<string>();
        const conversationsList: Conversation[] = [];
        
        // Process message partners
        messagePartners?.forEach(msg => {
          const partnerId = msg.sender_id === user.id ? msg.recipient_id : msg.sender_id;
          const partnerName = msg.sender_id === user.id ? msg.profiles!["recipient"].full_name : msg.profiles!["sender"].full_name;
          
          if (!uniquePartners.has(partnerId)) {
            uniquePartners.add(partnerId);
            
            // For each unique partner, get last message and unread count
            conversationsList.push({
              id: crypto.randomUUID(), // Temporary ID
              participantId: partnerId,
              participantName: partnerName || 'Unknown User',
              participantRole: 'Unknown', // This would need to be fetched from user_roles
              lastMessage: "Loading...",
              lastMessageTime: new Date().toISOString(),
              unreadCount: 0
            });
          }
        });
        
        // Update with last messages and unread counts (simplified for now)
        setConversations(conversationsList);
      } catch (error) {
        console.error('Error fetching conversations:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchConversations();
    
    // Set up subscription for real-time updates
    const channel = supabase
      .channel('conversation-updates')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'user_messages',
        filter: `recipient_id=eq.${user.id}`
      }, (payload) => {
        // Update conversations when a new message is received
        fetchConversations();
      })
      .subscribe();
      
    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);
  
  // Filter conversations by search query
  const filteredConversations = conversations.filter(conversation => 
    conversation.participantName.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    
    if (date.toDateString() === now.toDateString()) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    
    if (now.getTime() - date.getTime() < 7 * 24 * 60 * 60 * 1000) {
      return date.toLocaleDateString(undefined, { weekday: 'short' });
    }
    
    return date.toLocaleDateString();
  };

  return (
    <div className="w-full md:w-1/3 border-r flex flex-col overflow-hidden">
      <CardHeader className="px-4 pb-2">
        <CardTitle>Conversations</CardTitle>
        <div className="relative my-2">
          <Search className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search conversations..." 
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </CardHeader>
      <CardContent className="px-2 overflow-y-auto flex-grow">
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
          </div>
        ) : filteredConversations.length > 0 ? (
          <div className="space-y-1">
            {filteredConversations.map((conversation) => (
              <div
                key={conversation.id}
                className={`p-3 rounded-lg cursor-pointer transition-colors ${
                  selectedConversationId === conversation.participantId
                    ? 'bg-secondary'
                    : 'hover:bg-secondary/50'
                }`}
                onClick={() => onSelectConversation(conversation.participantId)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>
                        {conversation.participantName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold">
                        {conversation.participantName}
                      </div>
                      <div className="text-sm text-muted-foreground truncate max-w-[180px]">
                        {conversation.lastMessage}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <div className="text-xs text-muted-foreground">
                      {formatDate(conversation.lastMessageTime)}
                    </div>
                    {conversation.unreadCount > 0 && (
                      <Badge variant="destructive" className="p-1 h-5 min-w-5 flex items-center justify-center rounded-full">
                        {conversation.unreadCount}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-10 text-center">
            <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground" />
            <h3 className="mt-4 text-lg font-medium">No conversations yet</h3>
            <p className="mt-2 text-muted-foreground">
              {searchQuery ? "No conversations match your search" : "Start messaging with others to see conversations here"}
            </p>
          </div>
        )}
      </CardContent>
    </div>
  );
};

export default ConversationList;
