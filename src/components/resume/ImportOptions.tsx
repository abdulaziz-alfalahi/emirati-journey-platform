// Updated handleImageUpload function in src/components/resume/ImportOptions.tsx
const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) return;

  setIsUploading(true);
  setUploadError(null);
  
  const toastId = toast.loading("Processing Resume Image", {
    description: "Analyzing your resume image with AI...",
  });
  
  try {
    if (file.size > 10 * 1024 * 1024) { // 10MB limit for images
      throw new Error("Image too large. Please upload an image smaller than 10MB.");
    }
    
    const supportedImageTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/heic'];
    if (!supportedImageTypes.includes(file.type)) {
      throw new Error("Unsupported image format. Please upload JPG, PNG, WebP, or HEIC images.");
    }
    
    toast.loading("Extracting Data from Image", {
      id: toastId,
      description: "Using AI to recognize and extract text from your resume image...",
    });
    
    const parsedData = await parseResumeFromImage(file);
    
    if (!parsedData || (
      (!parsedData.personal || Object.values(parsedData.personal).filter(Boolean).length === 0) && 
      (!parsedData.experience || parsedData.experience.length === 0) &&
      (!parsedData.education || parsedData.education.length === 0)
    )) {
      throw new Error("Could not extract meaningful data from your resume image. Please try a clearer image or a different format.");
    }
    
    toast.success("Resume Image Processed", {
      id: toastId,
      description: "Your resume image has been processed successfully with AI.",
    });
    
    const mergedData = mergeResumeData(currentData, parsedData);
    onImportComplete(mergedData);
    
    setImageDialogOpen(false);
  } catch (error) {
    console.error('Error parsing resume image:', error);
    
    let errorMessage = error instanceof Error ? error.message : "Failed to parse resume image";
    setUploadError(errorMessage);
    
    toast.error("Error Processing Resume Image", {
      id: toastId,
      description: errorMessage,
    });
  } finally {
    setIsUploading(false);
    if (imageInputRef.current) imageInputRef.current.value = '';
  }
};
