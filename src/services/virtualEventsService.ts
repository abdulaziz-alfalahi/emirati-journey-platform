
import { supabase } from '@/integrations/supabase/client';
import type {
  VirtualEvent,
  VirtualBooth,
  EventRegistration,
  EventSession,
  NetworkingRoom,
  NetworkingConnection,
  BoothVisit,
  EventAnalytics,
  CreateEventData,
  CreateBoothData,
  CreateSessionData
} from '@/types/virtualEvents';

export class VirtualEventsService {
  // Event Management
  static async getEvents(filters?: {
    event_type?: string;
    status?: string;
    search?: string;
    upcoming?: boolean;
  }): Promise<VirtualEvent[]> {
    let query = supabase
      .from('virtual_events')
      .select('*')
      .order('start_date', { ascending: true });

    if (filters?.event_type) {
      query = query.eq('event_type', filters.event_type);
    }
    if (filters?.status) {
      query = query.eq('status', filters.status);
    }
    if (filters?.upcoming) {
      query = query.gte('start_date', new Date().toISOString());
    }
    if (filters?.search) {
      query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  }

  static async getEventById(id: string): Promise<VirtualEvent | null> {
    const { data, error } = await supabase
      .from('virtual_events')
      .select('*')
      .eq('id', id)
      .single();

    if (error) return null;
    return data;
  }

  static async createEvent(eventData: CreateEventData): Promise<VirtualEvent> {
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('virtual_events')
      .insert({
        organizer_id: user.user.id,
        ...eventData
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async updateEvent(id: string, updates: Partial<CreateEventData>): Promise<VirtualEvent> {
    const { data, error } = await supabase
      .from('virtual_events')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async deleteEvent(id: string): Promise<void> {
    const { error } = await supabase
      .from('virtual_events')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }

  // Registration Management
  static async registerForEvent(eventId: string, registrationData?: Record<string, any>): Promise<EventRegistration> {
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('virtual_event_registrations')
      .insert({
        event_id: eventId,
        user_id: user.user.id,
        registration_data: registrationData || {}
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async getEventRegistrations(eventId: string): Promise<EventRegistration[]> {
    const { data, error } = await supabase
      .from('virtual_event_registrations')
      .select(`
        *,
        profiles(id, full_name, email, avatar_url)
      `)
      .eq('event_id', eventId)
      .order('registration_date', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  static async getUserRegistration(eventId: string): Promise<EventRegistration | null> {
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) return null;

    const { data, error } = await supabase
      .from('virtual_event_registrations')
      .select('*')
      .eq('event_id', eventId)
      .eq('user_id', user.user.id)
      .single();

    if (error) return null;
    return data;
  }

  static async checkInToEvent(eventId: string): Promise<void> {
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) throw new Error('User not authenticated');

    const { error } = await supabase
      .from('virtual_event_registrations')
      .update({
        check_in_time: new Date().toISOString(),
        status: 'attended'
      })
      .eq('event_id', eventId)
      .eq('user_id', user.user.id);

    if (error) throw error;
  }

  // Booth Management
  static async createBooth(eventId: string, boothData: CreateBoothData): Promise<VirtualBooth> {
    const { data, error } = await supabase
      .from('virtual_booths')
      .insert({
        event_id: eventId,
        ...boothData
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async getEventBooths(eventId: string): Promise<VirtualBooth[]> {
    const { data, error } = await supabase
      .from('virtual_booths')
      .select('*')
      .eq('event_id', eventId)
      .order('is_featured', { ascending: false })
      .order('created_at', { ascending: true });

    if (error) throw error;
    return data || [];
  }

  static async visitBooth(boothId: string): Promise<BoothVisit> {
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) throw new Error('User not authenticated');

    // Get user's event registration
    const { data: booth } = await supabase
      .from('virtual_booths')
      .select('event_id')
      .eq('id', boothId)
      .single();

    if (!booth) throw new Error('Booth not found');

    const { data: registration } = await supabase
      .from('virtual_event_registrations')
      .select('id')
      .eq('event_id', booth.event_id)
      .eq('user_id', user.user.id)
      .single();

    if (!registration) throw new Error('User not registered for event');

    const { data, error } = await supabase
      .from('booth_visits')
      .insert({
        booth_id: boothId,
        visitor_id: user.user.id,
        event_registration_id: registration.id
      })
      .select()
      .single();

    if (error) throw error;

    // Update booth visitor count
    await supabase.rpc('increment_booth_visitors', { booth_id: boothId });

    return data;
  }

  // Session Management
  static async createSession(eventId: string, sessionData: CreateSessionData): Promise<EventSession> {
    const { data, error } = await supabase
      .from('event_sessions')
      .insert({
        event_id: eventId,
        ...sessionData
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async getEventSessions(eventId: string): Promise<EventSession[]> {
    const { data, error } = await supabase
      .from('event_sessions')
      .select('*')
      .eq('event_id', eventId)
      .order('start_time', { ascending: true });

    if (error) throw error;
    return data || [];
  }

  static async registerForSession(sessionId: string): Promise<void> {
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) throw new Error('User not authenticated');

    // Get session and event registration
    const { data: session } = await supabase
      .from('event_sessions')
      .select('event_id')
      .eq('id', sessionId)
      .single();

    if (!session) throw new Error('Session not found');

    const { data: registration } = await supabase
      .from('virtual_event_registrations')
      .select('id')
      .eq('event_id', session.event_id)
      .eq('user_id', user.user.id)
      .single();

    if (!registration) throw new Error('User not registered for event');

    const { error } = await supabase
      .from('session_registrations')
      .insert({
        session_id: sessionId,
        user_id: user.user.id,
        event_registration_id: registration.id
      });

    if (error) throw error;
  }

  // Networking Management
  static async getNetworkingRooms(eventId: string): Promise<NetworkingRoom[]> {
    const { data, error } = await supabase
      .from('networking_rooms')
      .select('*')
      .eq('event_id', eventId)
      .eq('is_active', true)
      .order('created_at', { ascending: true });

    if (error) throw error;
    return data || [];
  }

  static async createNetworkingConnection(
    eventId: string,
    recipientId: string,
    message?: string
  ): Promise<NetworkingConnection> {
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('virtual_networking_connections')
      .insert({
        event_id: eventId,
        initiator_id: user.user.id,
        recipient_id: recipientId,
        message
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async getNetworkingConnections(eventId: string): Promise<NetworkingConnection[]> {
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) return [];

    const { data, error } = await supabase
      .from('virtual_networking_connections')
      .select(`
        *,
        initiator:profiles!virtual_networking_connections_initiator_id_fkey(id, full_name, avatar_url),
        recipient:profiles!virtual_networking_connections_recipient_id_fkey(id, full_name, avatar_url)
      `)
      .eq('event_id', eventId)
      .or(`initiator_id.eq.${user.user.id},recipient_id.eq.${user.user.id}`)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  // Analytics
  static async recordAnalytic(
    eventId: string,
    metricType: string,
    metricName: string,
    metricValue: number,
    dimensions?: Record<string, any>
  ): Promise<void> {
    const { error } = await supabase
      .from('virtual_event_analytics')
      .insert({
        event_id: eventId,
        metric_type: metricType,
        metric_name: metricName,
        metric_value: metricValue,
        dimensions: dimensions || {}
      });

    if (error) throw error;
  }

  static async getEventAnalytics(eventId: string): Promise<EventAnalytics[]> {
    const { data, error } = await supabase
      .from('virtual_event_analytics')
      .select('*')
      .eq('event_id', eventId)
      .order('recorded_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  static async getAnalyticsSummary(eventId: string): Promise<Record<string, any>> {
    const analytics = await this.getEventAnalytics(eventId);
    const registrations = await this.getEventRegistrations(eventId);
    
    const summary = {
      totalRegistrations: registrations.length,
      attendedCount: registrations.filter(r => r.status === 'attended').length,
      averageSessionDuration: registrations.reduce((acc, r) => acc + r.session_duration, 0) / registrations.length || 0,
      totalNetworkingConnections: registrations.reduce((acc, r) => acc + r.networking_connections, 0),
      metrics: analytics.reduce((acc, metric) => {
        acc[metric.metric_name] = metric.metric_value;
        return acc;
      }, {} as Record<string, number>)
    };

    return summary;
  }
}
