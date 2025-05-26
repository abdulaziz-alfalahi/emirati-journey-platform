
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BlockchainCredential } from '@/types/blockchainCredentials';
import { Shield, Award, GraduationCap, FileCheck, Calendar, ExternalLink } from 'lucide-react';

interface CredentialCardProps {
  credential: BlockchainCredential;
  onClick?: () => void;
}

const CredentialCard: React.FC<CredentialCardProps> = ({ credential, onClick }) => {
  const getCredentialIcon = (type: string) => {
    switch (type) {
      case 'certification':
        return <Award className="h-5 w-5" />;
      case 'degree':
        return <GraduationCap className="h-5 w-5" />;
      case 'skill_badge':
        return <Shield className="h-5 w-5" />;
      case 'completion_certificate':
        return <FileCheck className="h-5 w-5" />;
      default:
        return <FileCheck className="h-5 w-5" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified':
        return 'bg-green-500';
      case 'pending':
        return 'bg-yellow-500';
      case 'revoked':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-AE', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={onClick}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-primary/10 rounded-full text-primary">
              {getCredentialIcon(credential.credential_type)}
            </div>
            <div>
              <CardTitle className="text-lg">{credential.title}</CardTitle>
              <CardDescription className="capitalize">
                {credential.credential_type.replace('_', ' ')}
              </CardDescription>
            </div>
          </div>
          <Badge 
            variant="outline" 
            className={`text-white ${getStatusColor(credential.verification_status)}`}
          >
            {credential.verification_status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {credential.description && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {credential.description}
          </p>
        )}
        
        <div className="flex items-center text-sm text-muted-foreground">
          <Calendar className="h-4 w-4 mr-1" />
          Issued: {formatDate(credential.issued_date)}
        </div>

        {credential.skills && credential.skills.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {credential.skills.slice(0, 3).map((skill) => (
              <Badge key={skill} variant="secondary" className="text-xs">
                {skill}
              </Badge>
            ))}
            {credential.skills.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{credential.skills.length - 3} more
              </Badge>
            )}
          </div>
        )}

        <div className="pt-2 border-t">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Block #{credential.block_number}</span>
            <Button variant="ghost" size="sm" className="h-6 px-2">
              <ExternalLink className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CredentialCard;
