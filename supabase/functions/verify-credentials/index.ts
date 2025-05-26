
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface VerificationRequest {
  verification_type: 'education' | 'employment' | 'certification';
  database_source: string;
  data: Record<string, any>;
  user_id: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const authHeader = req.headers.get('Authorization')!;
    const token = authHeader.replace('Bearer ', '');
    const { data: { user } } = await supabaseClient.auth.getUser(token);

    if (!user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (req.method === 'POST') {
      const body: VerificationRequest = await req.json();
      
      // Validate input
      if (!body.verification_type || !body.database_source || !body.data) {
        return new Response(
          JSON.stringify({ error: 'Missing required fields' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Get database configuration
      const { data: config, error: configError } = await supabaseClient
        .from('external_database_configs')
        .select('*')
        .eq('database_name', body.database_source)
        .eq('is_active', true)
        .single();

      if (configError || !config) {
        return new Response(
          JSON.stringify({ error: 'Database configuration not found' }),
          { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Create verification request record
      const { data: verificationRequest, error: requestError } = await supabaseClient
        .from('credential_verification_requests')
        .insert({
          user_id: user.id,
          database_source: body.database_source,
          verification_type: body.verification_type,
          request_data: body.data,
          expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
        })
        .select()
        .single();

      if (requestError) {
        return new Response(
          JSON.stringify({ error: 'Failed to create verification request' }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Perform external verification based on authentication type
      let verificationResult;
      
      try {
        switch (config.authentication_type) {
          case 'oauth':
            verificationResult = await performOAuthVerification(config, body.verification_type, body.data);
            break;
          case 'api_key':
            verificationResult = await performApiKeyVerification(config, body.verification_type, body.data);
            break;
          case 'certificate':
            verificationResult = await performCertificateVerification(config, body.verification_type, body.data);
            break;
          default:
            throw new Error('Unsupported authentication type');
        }
      } catch (verificationError) {
        // Update request status to failed
        await supabaseClient
          .from('credential_verification_requests')
          .update({
            status: 'failed',
            response_data: { error: verificationError.message },
            updated_at: new Date().toISOString()
          })
          .eq('id', verificationRequest.id);

        return new Response(
          JSON.stringify({ 
            error: 'External verification failed', 
            verification_id: verificationRequest.id 
          }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Update verification request with results
      const updateData: any = {
        status: verificationResult.success ? 'verified' : 'failed',
        response_data: verificationResult,
        updated_at: new Date().toISOString()
      };

      if (verificationResult.success) {
        updateData.verified_at = new Date().toISOString();
      }

      await supabaseClient
        .from('credential_verification_requests')
        .update(updateData)
        .eq('id', verificationRequest.id);

      // If verification successful, create verified credential record
      if (verificationResult.success) {
        const credentialData = createCredentialFromVerification(body.verification_type, body.data, verificationResult);
        
        await supabaseClient
          .from('verified_credentials')
          .insert({
            user_id: user.id,
            credential_type: body.verification_type,
            institution_name: credentialData.institution_name,
            credential_title: credentialData.credential_title,
            issue_date: credentialData.issue_date,
            verification_source: body.database_source,
            metadata: verificationResult.data
          });
      }

      return new Response(
        JSON.stringify({
          success: verificationResult.success,
          verification_id: verificationRequest.id,
          data: verificationResult.success ? verificationResult.data : undefined,
          error: verificationResult.success ? undefined : verificationResult.error
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Verification function error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

async function performOAuthVerification(config: any, verificationType: string, data: any) {
  // Simulate OAuth verification - in production this would handle OAuth flow
  console.log(`Performing OAuth verification for ${verificationType}`);
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
  
  // Simulate verification based on data completeness
  const isValid = validateCredentialData(verificationType, data);
  
  return {
    success: isValid,
    data: isValid ? {
      verified: true,
      verification_date: new Date().toISOString(),
      source: config.database_name,
      method: 'oauth',
      details: data
    } : undefined,
    error: isValid ? undefined : 'OAuth verification failed'
  };
}

async function performApiKeyVerification(config: any, verificationType: string, data: any) {
  // Simulate API key verification - in production this would use real API keys
  console.log(`Performing API key verification for ${verificationType}`);
  
  await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 1500));
  
  const isValid = validateCredentialData(verificationType, data);
  
  return {
    success: isValid,
    data: isValid ? {
      verified: true,
      verification_date: new Date().toISOString(),
      source: config.database_name,
      method: 'api_key',
      details: data
    } : undefined,
    error: isValid ? undefined : 'API key verification failed'
  };
}

async function performCertificateVerification(config: any, verificationType: string, data: any) {
  // Simulate certificate verification - in production this would use client certificates
  console.log(`Performing certificate verification for ${verificationType}`);
  
  await new Promise(resolve => setTimeout(resolve, 1200 + Math.random() * 1800));
  
  const isValid = validateCredentialData(verificationType, data);
  
  return {
    success: isValid,
    data: isValid ? {
      verified: true,
      verification_date: new Date().toISOString(),
      source: config.database_name,
      method: 'certificate',
      details: data
    } : undefined,
    error: isValid ? undefined : 'Certificate verification failed'
  };
}

function validateCredentialData(verificationType: string, data: any): boolean {
  switch (verificationType) {
    case 'education':
      return !!(data.emirates_id && data.institution_name && data.degree_type && data.graduation_year);
    case 'employment':
      return !!(data.emirates_id && data.employer_name && data.job_title && data.start_date);
    case 'certification':
      return !!(data.emirates_id && data.certification_name && data.issuing_organization && data.certification_number);
    default:
      return false;
  }
}

function createCredentialFromVerification(verificationType: string, data: any, verificationResult: any) {
  switch (verificationType) {
    case 'education':
      return {
        institution_name: data.institution_name,
        credential_title: `${data.degree_type} in ${data.field_of_study}`,
        issue_date: `${data.graduation_year}-01-01`
      };
    case 'employment':
      return {
        institution_name: data.employer_name,
        credential_title: data.job_title,
        issue_date: data.start_date
      };
    case 'certification':
      return {
        institution_name: data.issuing_organization,
        credential_title: data.certification_name,
        issue_date: data.issue_date
      };
    default:
      throw new Error('Invalid verification type');
  }
}
