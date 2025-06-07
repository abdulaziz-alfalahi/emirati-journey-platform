
export const professionalGrowthColors = {
  primary: "text-[rgb(var(--pg-primary))]",
  primaryLight: "text-[rgb(var(--pg-primary-light))]",
  secondary: "text-[rgb(var(--pg-secondary))]",
  secondaryLight: "text-[rgb(var(--pg-secondary-light))]",
  accent: "text-[rgb(var(--pg-accent))]",
  accentLight: "text-[rgb(var(--pg-accent-light))]",
  
  bgPrimary: "bg-[rgb(var(--pg-primary))]",
  bgPrimaryLight: "bg-[rgb(var(--pg-primary-light))]",
  bgSecondary: "bg-[rgb(var(--pg-secondary))]",
  bgSecondaryLight: "bg-[rgb(var(--pg-secondary-light))]",
  bgAccent: "bg-[rgb(var(--pg-accent))]",
  bgAccentLight: "bg-[rgb(var(--pg-accent-light))]",
  bgBackground: "bg-[rgb(var(--pg-background))]",
  
  borderPrimary: "border-[rgb(var(--pg-primary))]",
  borderSecondary: "border-[rgb(var(--pg-secondary))]",
  borderAccent: "border-[rgb(var(--pg-accent))]",
};

export const getStatColor = (index: number) => {
  const colors = [
    "bg-[rgb(var(--pg-secondary))]",
    "bg-[rgb(var(--pg-primary))]",
    "bg-[rgb(var(--pg-accent))]",
    "bg-purple-500"
  ];
  return colors[index % colors.length];
};
