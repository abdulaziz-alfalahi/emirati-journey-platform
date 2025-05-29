
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Download, 
  Share, 
  X,
  CheckCircle,
  AlertTriangle,
  Loader2
} from 'lucide-react';
import { BlockchainCredential } from '@/types/blockchainCredentials';
import { batchCredentialService, BatchOperationResult } from '@/services/blockchain/batchCredentialService';
import { toast } from 'sonner';

interface BatchOperationsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCredentials: BlockchainCredential[];
  userId: string;
  canRevoke?: boolean;
}

const BatchOperationsDialog: React.FC<BatchOperationsDialogProps> = ({
  isOpen,
  onClose,
  selectedCredentials,
  userId,
  canRevoke = false
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [operation, setOperation] = useState<'download' | 'share' | 'revoke' | null>(null);
  const [revocationReason, setRevocationReason] = useState('');
  const [result, setResult] = useState<BatchOperationResult | null>(null);
  const [progress, setProgress] = useState(0);

  const handleBatchDownload = async () => {
    setIsProcessing(true);
    setOperation('download');
    setProgress(0);

    try {
      const credentialIds = selectedCredentials.map(c => c.id);
      const result = await batchCredentialService.batchDownload(credentialIds, userId);
      
      setResult(result);
      setProgress(100);

      if (result.downloadUrl) {
        const a = document.createElement('a');
        a.href = result.downloadUrl;
        a.download = `batch-credentials-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(result.downloadUrl);
      }

      toast.success(`Downloaded ${result.successful.length} credentials successfully`);
    } catch (error) {
      console.error('Batch download failed:', error);
      toast.error('Batch download failed');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleBatchShare = async () => {
    setIsProcessing(true);
    setOperation('share');
    setProgress(0);

    try {
      const credentialIds = selectedCredentials.map(c => c.id);
      const result = await batchCredentialService.batchShare(credentialIds, userId);
      
      setResult(result);
      setProgress(100);

      toast.success(`Shared ${result.successful.length} credentials successfully`);
    } catch (error) {
      console.error('Batch share failed:', error);
      toast.error('Batch share failed');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleBatchRevoke = async () => {
    if (!revocationReason.trim()) {
      toast.error('Please provide a revocation reason');
      return;
    }

    setIsProcessing(true);
    setOperation('revoke');
    setProgress(0);

    try {
      const credentialIds = selectedCredentials.map(c => c.id);
      const result = await batchCredentialService.batchRevoke(credentialIds, revocationReason, userId);
      
      setResult(result);
      setProgress(100);

      toast.success(`Revoked ${result.successful.length} credentials successfully`);
    } catch (error) {
      console.error('Batch revocation failed:', error);
      toast.error('Batch revocation failed');
    } finally {
      setIsProcessing(false);
    }
  };

  const resetDialog = () => {
    setOperation(null);
    setResult(null);
    setProgress(0);
    setRevocationReason('');
    setIsProcessing(false);
  };

  const handleClose = () => {
    resetDialog();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Batch Operations</DialogTitle>
          <DialogDescription>
            Manage {selectedCredentials.length} selected credentials
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Selected Credentials Summary */}
          <div className="p-3 bg-muted rounded-lg">
            <h4 className="font-medium mb-2">Selected Credentials ({selectedCredentials.length})</h4>
            <div className="max-h-32 overflow-y-auto space-y-1">
              {selectedCredentials.map((credential) => (
                <div key={credential.id} className="text-sm flex items-center justify-between">
                  <span className="truncate">{credential.title}</span>
                  <Badge variant="outline" className="ml-2">
                    {credential.credential_type}
                  </Badge>
                </div>
              ))}
            </div>
          </div>

          {/* Operation Buttons */}
          {!operation && !result && (
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                onClick={handleBatchDownload}
                disabled={isProcessing}
                className="flex items-center"
              >
                <Download className="h-4 w-4 mr-2" />
                Download All
              </Button>
              
              <Button
                variant="outline"
                onClick={handleBatchShare}
                disabled={isProcessing}
                className="flex items-center"
              >
                <Share className="h-4 w-4 mr-2" />
                Share All
              </Button>
              
              {canRevoke && (
                <div className="col-span-2">
                  <Textarea
                    placeholder="Enter revocation reason..."
                    value={revocationReason}
                    onChange={(e) => setRevocationReason(e.target.value)}
                    className="mb-2"
                  />
                  <Button
                    variant="destructive"
                    onClick={handleBatchRevoke}
                    disabled={isProcessing || !revocationReason.trim()}
                    className="w-full flex items-center"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Revoke All
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* Processing State */}
          {isProcessing && (
            <div className="space-y-3">
              <div className="flex items-center">
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                <span className="text-sm">
                  Processing {operation} operation...
                </span>
              </div>
              <Progress value={progress} className="w-full" />
            </div>
          )}

          {/* Results */}
          {result && (
            <div className="space-y-3">
              <Alert>
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>
                  Operation completed: {result.successful.length} successful, {result.failed.length} failed
                </AlertDescription>
              </Alert>

              {result.failed.length > 0 && (
                <Alert variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    <div className="space-y-1">
                      <p>Failed operations:</p>
                      {result.failed.map((failure) => (
                        <p key={failure.id} className="text-xs">
                          {failure.id}: {failure.error}
                        </p>
                      ))}
                    </div>
                  </AlertDescription>
                </Alert>
              )}

              <Button onClick={resetDialog} className="w-full">
                Start New Operation
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BatchOperationsDialog;
