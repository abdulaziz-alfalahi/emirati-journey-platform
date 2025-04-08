
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { MessageSquare, Search, Send, User } from 'lucide-react';

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  recipientId: string;
  recipientName: string;
  content: string;
  timestamp: string;
  read: boolean;
}

interface Conversation {
  id: string;
  participantId: string;
  participantName: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
}

const sampleConversations: Conversation[] = [
  {
    id: '1',
    participantId: 'user1',
    participantName: 'Ahmed Hassan',
    lastMessage: 'Thank you for the interview opportunity.',
    lastMessageTime: '2023-06-14T15:30:00',
    unreadCount: 2
  },
  {
    id: '2',
    participantId: 'user2',
    participantName: 'Sara Al Mahmoud',
    lastMessage: 'I am available for the follow-up interview next week.',
    lastMessageTime: '2023-06-13T09:15:00',
    unreadCount: 0
  },
  {
    id: '3',
    participantId: 'user3',
    participantName: 'Mohammed Al Ali',
    lastMessage: 'Do you have any updates on my application status?',
    lastMessageTime: '2023-06-12T14:20:00',
    unreadCount: 1
  }
];

const sampleMessages: Record<string, Message[]> = {
  '1': [
    {
      id: 'm1',
      senderId: 'user1',
      senderName: 'Ahmed Hassan',
      recipientId: 'recruiter',
      recipientName: 'Recruiter',
      content: 'Hello, I saw your job posting for the Senior Software Engineer position.',
      timestamp: '2023-06-14T15:20:00',
      read: true
    },
    {
      id: 'm2',
      senderId: 'recruiter',
      senderName: 'Recruiter',
      recipientId: 'user1',
      recipientName: 'Ahmed Hassan',
      content: 'Hi Ahmed, thank you for your interest. We would like to invite you for an interview.',
      timestamp: '2023-06-14T15:25:00',
      read: true
    },
    {
      id: 'm3',
      senderId: 'user1',
      senderName: 'Ahmed Hassan',
      recipientId: 'recruiter',
      recipientName: 'Recruiter',
      content: 'Thank you for the interview opportunity.',
      timestamp: '2023-06-14T15:30:00',
      read: false
    },
    {
      id: 'm4',
      senderId: 'user1',
      senderName: 'Ahmed Hassan',
      recipientId: 'recruiter',
      recipientName: 'Recruiter',
      content: 'When would be a good time for the interview?',
      timestamp: '2023-06-14T15:31:00',
      read: false
    }
  ],
  '2': [
    {
      id: 'm5',
      senderId: 'user2',
      senderName: 'Sara Al Mahmoud',
      recipientId: 'recruiter',
      recipientName: 'Recruiter',
      content: 'I have completed the first round of interviews. What are the next steps?',
      timestamp: '2023-06-13T09:10:00',
      read: true
    },
    {
      id: 'm6',
      senderId: 'recruiter',
      senderName: 'Recruiter',
      recipientId: 'user2',
      recipientName: 'Sara Al Mahmoud',
      content: 'Hi Sara, we would like to schedule a follow-up interview with the team lead.',
      timestamp: '2023-06-13T09:12:00',
      read: true
    },
    {
      id: 'm7',
      senderId: 'user2',
      senderName: 'Sara Al Mahmoud',
      recipientId: 'recruiter',
      recipientName: 'Recruiter',
      content: 'I am available for the follow-up interview next week.',
      timestamp: '2023-06-13T09:15:00',
      read: true
    }
  ],
  '3': [
    {
      id: 'm8',
      senderId: 'user3',
      senderName: 'Mohammed Al Ali',
      recipientId: 'recruiter',
      recipientName: 'Recruiter',
      content: 'I submitted my application for the UX Designer position last week.',
      timestamp: '2023-06-12T14:15:00',
      read: true
    },
    {
      id: 'm9',
      senderId: 'recruiter',
      senderName: 'Recruiter',
      recipientId: 'user3',
      recipientName: 'Mohammed Al Ali',
      content: 'Thank you for your application. We are currently reviewing all applications and will get back to you soon.',
      timestamp: '2023-06-12T14:18:00',
      read: true
    },
    {
      id: 'm10',
      senderId: 'user3',
      senderName: 'Mohammed Al Ali',
      recipientId: 'recruiter',
      recipientName: 'Recruiter',
      content: 'Do you have any updates on my application status?',
      timestamp: '2023-06-12T14:20:00',
      read: false
    }
  ]
};

const formatTime = (timestamp: string) => {
  const date = new Date(timestamp);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const formatDate = (timestamp: string) => {
  const date = new Date(timestamp);
  const now = new Date();
  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  
  if (date.toDateString() === now.toDateString()) {
    return 'Today';
  } else if (date.toDateString() === yesterday.toDateString()) {
    return 'Yesterday';
  } else {
    return date.toLocaleDateString();
  }
};

const Messages = () => {
  const { toast } = useToast();
  const [conversations] = useState<Conversation[]>(sampleConversations);
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Select conversation and load messages
  const handleSelectConversation = (conversationId: string) => {
    setSelectedConversation(conversationId);
    if (sampleMessages[conversationId]) {
      setMessages(sampleMessages[conversationId]);
    } else {
      setMessages([]);
    }
  };

  // Send new message
  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;
    
    const conversation = conversations.find(c => c.id === selectedConversation);
    if (!conversation) return;
    
    const newMessageObj: Message = {
      id: `m${Date.now()}`,
      senderId: 'recruiter',
      senderName: 'Recruiter',
      recipientId: conversation.participantId,
      recipientName: conversation.participantName,
      content: newMessage,
      timestamp: new Date().toISOString(),
      read: true
    };
    
    setMessages([...messages, newMessageObj]);
    setNewMessage('');
    
    toast({
      title: 'Message Sent',
      description: 'Your message has been sent successfully.',
    });
  };

  // Filter conversations by search query
  const filteredConversations = conversations.filter(conversation => 
    conversation.participantName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Messages</h2>
        <p className="text-muted-foreground">Communicate with candidates and team members</p>
      </div>
      
      <Card className="flex flex-col md:flex-row">
        {/* Conversations list */}
        <div className="w-full md:w-1/3 border-r">
          <CardHeader className="px-4 pb-2">
            <CardTitle>Conversations</CardTitle>
            <CardDescription>Your recent message threads</CardDescription>
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
          <CardContent className="px-2 h-[500px] overflow-y-auto">
            <div className="space-y-1">
              {filteredConversations.length > 0 ? (
                filteredConversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedConversation === conversation.id
                        ? 'bg-secondary'
                        : 'hover:bg-secondary/50'
                    }`}
                    onClick={() => handleSelectConversation(conversation.id)}
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
                ))
              ) : (
                <div className="py-10 text-center text-muted-foreground">
                  No conversations found
                </div>
              )}
            </div>
          </CardContent>
        </div>
        
        {/* Message thread */}
        <div className="w-full md:w-2/3 flex flex-col">
          {selectedConversation ? (
            <>
              <CardHeader className="px-6 pb-0">
                {conversations.find(c => c.id === selectedConversation) && (
                  <div className="flex items-center gap-2">
                    <Avatar>
                      <AvatarFallback>
                        {conversations.find(c => c.id === selectedConversation)?.participantName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle>
                        {conversations.find(c => c.id === selectedConversation)?.participantName}
                      </CardTitle>
                      <CardDescription>
                        Candidate for position
                      </CardDescription>
                    </div>
                  </div>
                )}
              </CardHeader>
              <CardContent className="flex-grow flex flex-col p-0">
                <div className="flex-grow p-6 overflow-y-auto h-[400px]">
                  <div className="space-y-6">
                    {messages.map((message, index) => {
                      const isFirstInGroup = index === 0 || messages[index - 1].senderId !== message.senderId;
                      const showTimestamp = index === 0 || 
                        new Date(message.timestamp).toDateString() !== 
                        new Date(messages[index - 1].timestamp).toDateString();
                      
                      return (
                        <div key={message.id}>
                          {showTimestamp && (
                            <div className="flex justify-center my-4">
                              <Badge variant="outline" className="bg-background">
                                {formatDate(message.timestamp)}
                              </Badge>
                            </div>
                          )}
                          <div className={`flex ${message.senderId === 'recruiter' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`flex ${message.senderId === 'recruiter' ? 'flex-row-reverse' : 'flex-row'} gap-2 max-w-[80%]`}>
                              {isFirstInGroup && message.senderId !== 'recruiter' && (
                                <Avatar className="mt-1">
                                  <AvatarFallback>{message.senderName.charAt(0)}</AvatarFallback>
                                </Avatar>
                              )}
                              <div>
                                {isFirstInGroup && message.senderId !== 'recruiter' && (
                                  <div className="text-sm font-medium mb-1">{message.senderName}</div>
                                )}
                                <div className={`rounded-lg p-3 ${
                                  message.senderId === 'recruiter' 
                                    ? 'bg-primary text-primary-foreground'
                                    : 'bg-muted'
                                }`}>
                                  {message.content}
                                </div>
                                <div className="text-xs text-muted-foreground mt-1 text-right">
                                  {formatTime(message.timestamp)}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="p-4 border-t">
                  <div className="flex gap-2">
                    <Input 
                      placeholder="Type your message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                    />
                    <Button 
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim()}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </>
          ) : (
            <div className="flex items-center justify-center h-full p-6">
              <div className="text-center">
                <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">No conversation selected</h3>
                <p className="mt-2 text-muted-foreground">
                  Select a conversation from the list to start messaging.
                </p>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default Messages;
