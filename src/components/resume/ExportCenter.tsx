
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Download, 
  FileText, 
  Link, 
  Share2,
  Mail,
  CheckCircle,
  Settings,
  Eye,
  Shield,
  Globe
} from 'lucide-react';

interface ExportFormat {
  type: 'pdf' | 'docx' | 'html' | 'txt';
  name: string;
  description: string;
  icon: any;
  recommended: boolean;
  features: string[];
}

const ExportCenter: React.FC = () => {
  const [selectedFormat, setSelectedFormat] = useState<string>('pdf');
  const [quality, setQuality] = useState<string>('high');
  const [includePhoto, setIncludePhoto] = useState(false);
  const [password, setPassword] = useState('');
  const [isExporting, setIsExporting] = useState(false);
  const [shareableLink, setShareableLink] = useState('');

  const exportFormats: ExportFormat[] = [
    {
      type: 'pdf',
      name: 'PDF Document',
      description: 'Perfect for job applications and ATS systems',
      icon: FileText,
      recommended: true,
      features: ['ATS Compatible', 'Professional formatting', 'Universal compatibility', 'Print ready']
    },
    {
      type: 'docx',
      name: 'Word Document',
      description: 'Editable format for further customization',
      icon: FileText,
      recommended: false,
      features: ['Fully editable', 'Template preservation', 'Microsoft Office compatible']
    },
    {
      type: 'html',
      name: 'Web Page',
      description: 'Online portfolio format with interactive elements',
      icon: Globe,
      recommended: false,
      features: ['Interactive design', 'Web optimized', 'Portfolio style', 'Social sharing']
    },
    {
      type: 'txt',
      name: 'Plain Text',
      description: 'Simple text format for basic applications',
      icon: FileText,
      recommended: false,
      features: ['Universal compatibility', 'Lightweight', 'Email friendly']
    }
  ];

  const qualityOptions = [
    { value: 'standard', label: 'Standard Quality', description: 'Smaller file size, good for online submissions' },
    { value: 'high', label: 'High Quality', description: 'Recommended for most applications' },
    { value: 'print', label: 'Print Quality', description: 'Highest quality for physical printing' }
  ];

  const handleExport = async () => {
    setIsExporting(true);
    // Simulate export process
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsExporting(false);
    
    // Simulate file download
    const link = document.createElement('a');
    link.href = '#';
    link.download = `resume.${selectedFormat}`;
    link.click();
  };

  const generateShareableLink = () => {
    // Simulate link generation
    const mockLink = `https://resume.ehrdc.ae/share/${Math.random().toString(36).substr(2, 9)}`;
    setShareableLink(mockLink);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Export & Share Your Resume
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Download your resume in multiple formats or create shareable links for online applications and portfolio showcasing
        </p>
      </div>

      <Tabs defaultValue="download" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="download">Download</TabsTrigger>
          <TabsTrigger value="share">Share Online</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="settings">Export Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="download" className="space-y-6">
          {/* Format Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Download className="h-5 w-5 mr-2 text-ehrdc-teal" />
                Choose Export Format
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {exportFormats.map((format) => (
                  <div
                    key={format.type}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      selectedFormat === format.type
                        ? 'border-ehrdc-teal bg-ehrdc-teal/5 ring-2 ring-ehrdc-teal/20'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedFormat(format.type)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center">
                        <format.icon className="h-6 w-6 text-ehrdc-teal mr-3" />
                        <div>
                          <h3 className="font-semibold text-gray-900">{format.name}</h3>
                          {format.recommended && (
                            <Badge className="bg-green-100 text-green-800 text-xs mt-1">
                              Recommended
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className={`w-4 h-4 rounded-full border-2 ${
                        selectedFormat === format.type
                          ? 'border-ehrdc-teal bg-ehrdc-teal'
                          : 'border-gray-300'
                      }`}>
                        {selectedFormat === format.type && (
                          <div className="w-2 h-2 bg-white rounded-full m-0.5"></div>
                        )}
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-3">{format.description}</p>
                    
                    <div className="flex flex-wrap gap-1">
                      {format.features.map((feature, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quality Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="h-5 w-5 mr-2 text-ehrdc-teal" />
                Export Quality
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {qualityOptions.map((option) => (
                  <div
                    key={option.value}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      quality === option.value
                        ? 'border-ehrdc-teal bg-ehrdc-teal/5'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setQuality(option.value)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{option.label}</h4>
                      {quality === option.value && (
                        <CheckCircle className="h-4 w-4 text-ehrdc-teal" />
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{option.description}</p>
                  </div>
                ))}
              </div>
              
              <div className="flex items-center space-x-2 pt-4 border-t">
                <Checkbox 
                  id="include-photo" 
                  checked={includePhoto}
                  onCheckedChange={setIncludePhoto}
                />
                <Label htmlFor="include-photo" className="text-sm">
                  Include profile photo (if uploaded)
                </Label>
              </div>
            </CardContent>
          </Card>

          {/* Download Action */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Ready to download your resume
                  </h3>
                  <p className="text-sm text-gray-600">
                    {selectedFormat.toUpperCase()} format • {quality} quality
                  </p>
                </div>
                <Button 
                  onClick={handleExport}
                  disabled={isExporting}
                  size="lg"
                  className="bg-ehrdc-teal hover:bg-ehrdc-teal/90"
                >
                  {isExporting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Exporting...
                    </>
                  ) : (
                    <>
                      <Download className="h-4 w-4 mr-2" />
                      Download Resume
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="share" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Share2 className="h-5 w-5 mr-2 text-ehrdc-teal" />
                Create Shareable Link
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">
                Generate a secure, shareable link to your resume that you can include in job applications or share with recruiters.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="link-password" className="text-sm font-medium">
                      Password Protection (Optional)
                    </Label>
                    <Input
                      id="link-password"
                      type="password"
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox id="link-analytics" />
                    <Label htmlFor="link-analytics" className="text-sm">
                      Enable view analytics
                    </Label>
                  </div>
                  
                  <Button 
                    onClick={generateShareableLink}
                    className="w-full bg-ehrdc-teal hover:bg-ehrdc-teal/90"
                  >
                    <Link className="h-4 w-4 mr-2" />
                    Generate Shareable Link
                  </Button>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-3">Features included:</h4>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                      Professional web view
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                      Mobile responsive
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                      Download options
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                      View analytics
                    </div>
                  </div>
                </div>
              </div>
              
              {shareableLink && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <h4 className="font-medium text-green-800 mb-2">Your shareable link is ready!</h4>
                  <div className="flex items-center space-x-2">
                    <Input 
                      value={shareableLink} 
                      readOnly 
                      className="bg-white border-green-300"
                    />
                    <Button 
                      variant="outline" 
                      onClick={() => copyToClipboard(shareableLink)}
                      className="border-green-300 text-green-700 hover:bg-green-100"
                    >
                      Copy
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="email" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-ehrdc-teal" />
                Email Your Resume
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="recipient-email" className="text-sm font-medium">
                    Recipient Email
                  </Label>
                  <Input
                    id="recipient-email"
                    type="email"
                    placeholder="recruiter@company.com"
                  />
                </div>
                <div>
                  <Label htmlFor="subject" className="text-sm font-medium">
                    Subject Line
                  </Label>
                  <Input
                    id="subject"
                    placeholder="Resume - [Your Name] - [Position]"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="message" className="text-sm font-medium">
                  Message (Optional)
                </Label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full mt-1 p-3 border border-gray-300 rounded-md"
                  placeholder="Dear Hiring Manager,&#10;&#10;I am writing to express my interest in..."
                ></textarea>
              </div>
              
              <Button className="w-full bg-ehrdc-teal hover:bg-ehrdc-teal/90">
                <Mail className="h-4 w-4 mr-2" />
                Send Resume via Email
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="h-5 w-5 mr-2 text-ehrdc-teal" />
                Privacy & Security Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">Public Resume Visibility</h4>
                    <p className="text-sm text-gray-600">Allow your resume to be discovered by recruiters</p>
                  </div>
                  <Checkbox />
                </div>
                
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">Download Tracking</h4>
                    <p className="text-sm text-gray-600">Track when your resume is downloaded</p>
                  </div>
                  <Checkbox defaultChecked />
                </div>
                
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">Contact Information Visibility</h4>
                    <p className="text-sm text-gray-600">Show full contact details in shared links</p>
                  </div>
                  <Checkbox defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Export History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { date: '2024-01-15', format: 'PDF', quality: 'High', downloads: 12 },
                  { date: '2024-01-10', format: 'DOCX', quality: 'Standard', downloads: 3 },
                  { date: '2024-01-05', format: 'PDF', quality: 'Print', downloads: 1 }
                ].map((export_, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium text-gray-900">
                        {export_.format} • {export_.quality} Quality
                      </div>
                      <div className="text-sm text-gray-600">{export_.date}</div>
                    </div>
                    <div className="text-sm text-gray-600">
                      {export_.downloads} downloads
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ExportCenter;
