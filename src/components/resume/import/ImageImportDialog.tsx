const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>)  => {
  const file = e.target.files?.[0];
  if (!file) return;
  
  setIsUploading(true);
  
  // Show loading toast
  toast.loading("Processing your resume...", {
    id: "resume-processing",
    duration: 60000 // 60 seconds timeout
  });
  
  try {
    // Convert file to base64
    const fileData = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target?.result as string);
      reader.onerror = (e) => reject(new Error('Failed to read file'));
      reader.readAsDataURL(file);
    });
    
    // Call your Edge Function
    const response = await supabase.functions.invoke('parse-resume', {
      body: {
        fileData,
        fileName: file.name,
        fileType: file.type
      }
    });
    
    // Dismiss loading toast
    toast.dismiss("resume-processing");
    
    if (response.error) {
      throw new Error(response.error.message || 'Failed to parse resume');
    }
    
    const parsedData = response.data;
    
    // Call the onImportComplete callback with the parsed data
    onImportComplete(parsedData);
    
    // Close the dialog
    onOpenChange(false);
    
    toast.success("Resume Imported", {
      description: "Your resume has been successfully imported.",
    });
  } catch (error) {
    // Dismiss loading toast
    toast.dismiss("resume-processing");
    
    console.error('Error uploading resume:', error);
    
    toast.error("Import Failed", {
      description: error instanceof Error ? error.message : "Failed to import resume. Please try again.",
    });
  } finally {
    setIsUploading(false);
  }
};
