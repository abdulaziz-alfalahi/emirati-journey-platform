import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Smartphone, Shield, KeyRound, Copy, Check, AlertTriangle } from 'lucide-react';
import { MFASetupStep, MFAMethod, MFAFactor } from '@/types/mfa';

interface MFASetupWizardProps {
  onComplete: () => void;
  onCancel?: () => void;
  required?: boolean;
}

export const MFASetupWizard: React.FC<MFASetupWizardProps> = ({
  onComplete,
  onCancel,
  required = false
}) => {
  const [currentStep, setCurrentStep] = useState<MFASetupStep>('select_method');
  const [selectedMethod, setSelectedMethod] = useState<MFAMethod>('totp');
  const [isLoading, setIsLoading] = useState(false);
  const [qrCode, setQrCode] = useState<string>('');
  const [secret, setSecret] = useState<string>('');
  const [factorId, setFactorId] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [backupCodes, setBackupCodes] = useState<string[]>([]);
  const [copiedCodes, setCopiedCodes] = useState(false);
  
  const { toast } = useToast();
  const { user } = useAuth();

  const setupTOTP = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.mfa.enroll({
        factorType: 'totp',
        friendlyName: 'Authenticator App'
      });

      if (error) throw error;

      setQrCode(data.totp.qr_code);
      setSecret(data.totp.secret);
      setFactorId(data.id);
      setCurrentStep('configure_totp');
    } catch (error: any) {
      toast({
        title: 'Setup Failed',
        description: error.message,
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const setupPhone = async () => {
    if (!user || !phoneNumber) return;
    
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.mfa.enroll({
        factorType: 'phone',
        friendlyName: 'Phone Number',
        phone: phoneNumber
      });

      if (error) throw error;

      setFactorId(data.id);
      setCurrentStep('verify');
    } catch (error: any) {
      toast({
        title: 'Setup Failed',
        description: error.message,
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const verifyFactor = async () => {
    if (!factorId || !verificationCode) return;
    
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.mfa.verify({
        factorId,
        challengeId: '',
        code: verificationCode
      });

      if (error) throw error;

      // Generate backup codes after successful verification
      await generateBackupCodes();
      setCurrentStep('backup_codes');
      
      toast({
        title: 'MFA Setup Complete',
        description: 'Multi-factor authentication has been successfully configured'
      });
    } catch (error: any) {
      toast({
        title: 'Verification Failed',
        description: error.message,
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const generateBackupCodes = async () => {
    // Generate 10 backup codes
    const codes = Array.from({ length: 10 }, () => 
      Math.random().toString(36).substring(2, 10).toUpperCase()
    );
    setBackupCodes(codes);
  };

  const copyBackupCodes = () => {
    const codesText = backupCodes.join('\n');
    navigator.clipboard.writeText(codesText);
    setCopiedCodes(true);
    toast({
      title: 'Backup Codes Copied',
      description: 'Save these codes in a secure location'
    });
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 'select_method':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Shield className="h-16 w-16 mx-auto text-primary mb-4" />
              <h2 className="text-2xl font-bold mb-2">Enable Multi-Factor Authentication</h2>
              <p className="text-muted-foreground">
                Add an extra layer of security to your account
              </p>
              {required && (
                <Alert className="mt-4">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    Multi-factor authentication is required for your account role.
                  </AlertDescription>
                </Alert>
              )}
            </div>
            
            <div className="grid gap-4">
              <Card 
                className={`cursor-pointer transition-colors ${
                  selectedMethod === 'totp' ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => setSelectedMethod('totp')}
              >
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <Smartphone className="h-8 w-8 text-primary" />
                    <div className="flex-1">
                      <h3 className="font-semibold">Authenticator App</h3>
                      <p className="text-sm text-muted-foreground">
                        Use Google Authenticator, Authy, or similar apps
                      </p>
                    </div>
                    <Badge variant="secondary">Recommended</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card 
                className={`cursor-pointer transition-colors ${
                  selectedMethod === 'sms' ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => setSelectedMethod('sms')}
              >
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <KeyRound className="h-8 w-8 text-primary" />
                    <div className="flex-1">
                      <h3 className="font-semibold">SMS Text Message</h3>
                      <p className="text-sm text-muted-foreground">
                        Receive verification codes via SMS
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="flex gap-3">
              <Button 
                onClick={selectedMethod === 'totp' ? setupTOTP : () => setCurrentStep('configure_phone')}
                disabled={isLoading}
                className="flex-1"
              >
                Continue with {selectedMethod === 'totp' ? 'Authenticator App' : 'SMS'}
              </Button>
              {!required && onCancel && (
                <Button variant="outline" onClick={onCancel}>
                  Cancel
                </Button>
              )}
            </div>
          </div>
        );

      case 'configure_totp':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">Setup Authenticator App</h2>
              <p className="text-muted-foreground">
                Scan the QR code with your authenticator app
              </p>
            </div>

            <div className="flex flex-col items-center space-y-4">
              {qrCode && (
                <div className="p-4 bg-white rounded-lg">
                  <img src={qrCode} alt="QR Code" className="w-48 h-48" />
                </div>
              )}
              
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">
                  Can't scan? Enter this key manually:
                </p>
                <code className="text-sm bg-muted p-2 rounded">{secret}</code>
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="totp-code">Enter verification code from your app</Label>
              <InputOTP 
                value={verificationCode}
                onChange={setVerificationCode}
                maxLength={6}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>

            <div className="flex gap-3">
              <Button 
                onClick={verifyFactor}
                disabled={isLoading || verificationCode.length !== 6}
                className="flex-1"
              >
                Verify & Enable
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setCurrentStep('select_method')}
              >
                Back
              </Button>
            </div>
          </div>
        );

      case 'configure_phone':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">Setup SMS Authentication</h2>
              <p className="text-muted-foreground">
                Enter your phone number to receive verification codes
              </p>
            </div>

            <div className="space-y-3">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+971 50 123 4567"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>

            <div className="flex gap-3">
              <Button 
                onClick={setupPhone}
                disabled={isLoading || !phoneNumber}
                className="flex-1"
              >
                Send Verification Code
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setCurrentStep('select_method')}
              >
                Back
              </Button>
            </div>
          </div>
        );

      case 'verify':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">Verify Your Phone</h2>
              <p className="text-muted-foreground">
                Enter the verification code sent to {phoneNumber}
              </p>
            </div>

            <div className="space-y-3">
              <Label htmlFor="sms-code">Verification Code</Label>
              <InputOTP 
                value={verificationCode}
                onChange={setVerificationCode}
                maxLength={6}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>

            <div className="flex gap-3">
              <Button 
                onClick={verifyFactor}
                disabled={isLoading || verificationCode.length !== 6}
                className="flex-1"
              >
                Verify & Enable
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setCurrentStep('configure_phone')}
              >
                Back
              </Button>
            </div>
          </div>
        );

      case 'backup_codes':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">Save Your Backup Codes</h2>
              <p className="text-muted-foreground">
                Store these codes securely. You can use them to access your account if you lose your device.
              </p>
            </div>

            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                These codes will only be shown once. Make sure to save them in a secure location.
              </AlertDescription>
            </Alert>

            <Card>
              <CardContent className="p-4">
                <div className="grid grid-cols-2 gap-2 font-mono text-sm">
                  {backupCodes.map((code, index) => (
                    <div key={index} className="p-2 bg-muted rounded text-center">
                      {code}
                    </div>
                  ))}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full mt-4"
                  onClick={copyBackupCodes}
                >
                  <Copy className="h-4 w-4 mr-2" />
                  {copiedCodes ? (
                    <>
                      <Check className="h-4 w-4 mr-2" />
                      Copied!
                    </>
                  ) : (
                    'Copy All Codes'
                  )}
                </Button>
              </CardContent>
            </Card>

            <Button onClick={onComplete} className="w-full">
              Complete Setup
            </Button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="p-6">
        {renderStepContent()}
      </CardContent>
    </Card>
  );
};