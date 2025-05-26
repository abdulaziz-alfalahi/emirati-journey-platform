
import { supabase } from "@/integrations/supabase/client";
import { ExternalDatabaseConfig } from "@/types/credentialVerification";

export class RateLimiter {
  private rateLimitMap = new Map<string, { count: number; resetTime: number }>();

  async checkRateLimit(databaseSource: string): Promise<void> {
    const config = await this.getDatabaseConfig(databaseSource);
    if (!config) throw new Error('Database configuration not found');

    const now = Date.now();
    const key = `${databaseSource}`;
    const limit = config.rate_limit_per_minute;
    
    const current = this.rateLimitMap.get(key);
    
    if (!current || now > current.resetTime) {
      // Reset rate limit window
      this.rateLimitMap.set(key, { count: 1, resetTime: now + 60000 });
      return;
    }
    
    if (current.count >= limit) {
      throw new Error(`Rate limit exceeded for ${databaseSource}. Please try again later.`);
    }
    
    current.count++;
  }

  private async getDatabaseConfig(databaseName: string): Promise<ExternalDatabaseConfig | null> {
    const { data, error } = await supabase
      .from('external_database_configs')
      .select('*')
      .eq('database_name', databaseName)
      .eq('is_active', true)
      .single();

    if (error) {
      console.error(`Error fetching config for ${databaseName}:`, error);
      return null;
    }
    
    return {
      ...data,
      authentication_type: data.authentication_type as 'oauth' | 'api_key' | 'certificate'
    };
  }
}
