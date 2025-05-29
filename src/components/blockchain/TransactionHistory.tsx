
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  History, 
  Shield, 
  Award, 
  Eye, 
  Download, 
  Share, 
  X,
  Filter,
  Calendar,
  User,
  Hash
} from 'lucide-react';
import { auditLogger, AuditLogEntry, AuditFilter } from '@/services/blockchain/auditLogger';
import { useAuth } from '@/context/AuthContext';

const TransactionHistory: React.FC = () => {
  const { user } = useAuth();
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>([]);
  const [filteredLogs, setFilteredLogs] = useState<AuditLogEntry[]>([]);
  const [filter, setFilter] = useState<AuditFilter>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadAuditLogs();
    }
  }, [user]);

  useEffect(() => {
    applyFilters();
  }, [auditLogs, filter]);

  const loadAuditLogs = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const logs = await auditLogger.getUserActivity(user.id, 100);
      setAuditLogs(logs);
    } catch (error) {
      console.error('Failed to load audit logs:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...auditLogs];

    if (filter.operation_type) {
      filtered = filtered.filter(log => log.operation_type === filter.operation_type);
    }

    if (filter.result) {
      filtered = filtered.filter(log => log.operation_details.result === filter.result);
    }

    if (filter.date_from) {
      filtered = filtered.filter(log => log.timestamp >= filter.date_from!);
    }

    if (filter.date_to) {
      filtered = filtered.filter(log => log.timestamp <= filter.date_to!);
    }

    setFilteredLogs(filtered);
  };

  const getOperationIcon = (operation: string) => {
    switch (operation) {
      case 'issue':
        return <Award className="h-4 w-4" />;
      case 'verify':
        return <Shield className="h-4 w-4" />;
      case 'revoke':
        return <X className="h-4 w-4" />;
      case 'view':
        return <Eye className="h-4 w-4" />;
      case 'download':
        return <Download className="h-4 w-4" />;
      case 'share':
        return <Share className="h-4 w-4" />;
      default:
        return <History className="h-4 w-4" />;
    }
  };

  const getResultBadge = (result?: string) => {
    switch (result) {
      case 'success':
        return <Badge variant="outline" className="text-green-600 border-green-600">Success</Badge>;
      case 'failure':
        return <Badge variant="outline" className="text-red-600 border-red-600">Failed</Badge>;
      case 'pending':
        return <Badge variant="outline" className="text-yellow-600 border-yellow-600">Pending</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('en-AE', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const clearFilters = () => {
    setFilter({});
  };

  if (!user) {
    return (
      <Card>
        <CardContent className="text-center py-8">
          <p className="text-muted-foreground">Please log in to view transaction history</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <History className="mr-2 h-5 w-5" />
            Transaction History & Audit Trail
          </CardTitle>
          <CardDescription>
            Complete history of all blockchain credential operations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="space-y-4">
            <TabsList>
              <TabsTrigger value="all">All Transactions</TabsTrigger>
              <TabsTrigger value="credentials">Credential Operations</TabsTrigger>
              <TabsTrigger value="verifications">Verifications</TabsTrigger>
            </TabsList>

            {/* Filters */}
            <div className="flex flex-wrap gap-4 items-end border-b pb-4">
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4" />
                <span className="text-sm font-medium">Filters:</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 flex-1">
                <div>
                  <label className="text-xs text-muted-foreground">Operation Type</label>
                  <Select 
                    value={filter.operation_type || ''} 
                    onValueChange={(value) => setFilter(prev => ({ ...prev, operation_type: value || undefined }))}
                  >
                    <SelectTrigger className="h-8">
                      <SelectValue placeholder="All operations" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="issue">Issue</SelectItem>
                      <SelectItem value="verify">Verify</SelectItem>
                      <SelectItem value="revoke">Revoke</SelectItem>
                      <SelectItem value="view">View</SelectItem>
                      <SelectItem value="download">Download</SelectItem>
                      <SelectItem value="share">Share</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-xs text-muted-foreground">Result</label>
                  <Select 
                    value={filter.result || ''} 
                    onValueChange={(value) => setFilter(prev => ({ ...prev, result: value || undefined }))}
                  >
                    <SelectTrigger className="h-8">
                      <SelectValue placeholder="All results" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="success">Success</SelectItem>
                      <SelectItem value="failure">Failed</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-xs text-muted-foreground">From Date</label>
                  <Input
                    type="date"
                    className="h-8"
                    value={filter.date_from?.split('T')[0] || ''}
                    onChange={(e) => setFilter(prev => ({ 
                      ...prev, 
                      date_from: e.target.value ? new Date(e.target.value).toISOString() : undefined 
                    }))}
                  />
                </div>

                <div>
                  <label className="text-xs text-muted-foreground">To Date</label>
                  <Input
                    type="date"
                    className="h-8"
                    value={filter.date_to?.split('T')[0] || ''}
                    onChange={(e) => setFilter(prev => ({ 
                      ...prev, 
                      date_to: e.target.value ? new Date(e.target.value).toISOString() : undefined 
                    }))}
                  />
                </div>
              </div>

              <Button variant="outline" size="sm" onClick={clearFilters}>
                Clear Filters
              </Button>
            </div>

            <TabsContent value="all" className="space-y-4">
              {isLoading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary mx-auto"></div>
                  <p className="mt-2 text-muted-foreground">Loading transaction history...</p>
                </div>
              ) : filteredLogs.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <History className="mx-auto h-12 w-12 mb-4 opacity-50" />
                  <p>No transactions found matching your criteria</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {filteredLogs.map((log) => (
                    <div key={log.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3">
                          <div className="p-2 bg-primary/10 rounded-full text-primary">
                            {getOperationIcon(log.operation_type)}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <h3 className="font-semibold capitalize">{log.operation_type} Operation</h3>
                              {getResultBadge(log.operation_details.result)}
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">
                              {log.operation_details.action}
                            </p>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-muted-foreground">
                              <div className="flex items-center">
                                <Calendar className="h-3 w-3 mr-1" />
                                {formatTimestamp(log.timestamp)}
                              </div>
                              
                              {log.transaction_hash && (
                                <div className="flex items-center">
                                  <Hash className="h-3 w-3 mr-1" />
                                  Tx: {log.transaction_hash.substring(0, 10)}...
                                </div>
                              )}
                              
                              {log.ip_address && log.ip_address !== 'unknown' && (
                                <div className="flex items-center">
                                  <User className="h-3 w-3 mr-1" />
                                  IP: {log.ip_address}
                                </div>
                              )}
                            </div>

                            {log.operation_details.metadata && (
                              <div className="mt-2 p-2 bg-muted rounded text-xs">
                                <strong>Metadata:</strong>
                                <pre className="mt-1 whitespace-pre-wrap">
                                  {JSON.stringify(log.operation_details.metadata, null, 2)}
                                </pre>
                              </div>
                            )}

                            {log.operation_details.error_message && (
                              <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded text-xs text-red-700">
                                <strong>Error:</strong> {log.operation_details.error_message}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="credentials">
              <div className="space-y-2">
                {filteredLogs
                  .filter(log => ['issue', 'revoke'].includes(log.operation_type))
                  .map((log) => (
                    <div key={log.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-primary/10 rounded-full text-primary">
                            {getOperationIcon(log.operation_type)}
                          </div>
                          <div>
                            <h3 className="font-semibold capitalize">{log.operation_type}</h3>
                            <p className="text-sm text-muted-foreground">{formatTimestamp(log.timestamp)}</p>
                          </div>
                        </div>
                        {getResultBadge(log.operation_details.result)}
                      </div>
                    </div>
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="verifications">
              <div className="space-y-2">
                {filteredLogs
                  .filter(log => log.operation_type === 'verify')
                  .map((log) => (
                    <div key={log.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-primary/10 rounded-full text-primary">
                            <Shield className="h-4 w-4" />
                          </div>
                          <div>
                            <h3 className="font-semibold">Verification</h3>
                            <p className="text-sm text-muted-foreground">{formatTimestamp(log.timestamp)}</p>
                          </div>
                        </div>
                        {getResultBadge(log.operation_details.result)}
                      </div>
                    </div>
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default TransactionHistory;
