
export interface Program {
  id: number;
  title: string;
  trainees: number;
  startDate: string;
  status: string;
  description?: string;
  documents?: ProgramDocument[];
}

export interface ProgramDocument {
  id: number;
  name: string;
  type: string;
  uploadDate: string;
  size: string;
}

export interface Assessment {
  id: number;
  title: string;
  candidates: number;
  date: string;
  type: string;
}

export interface NewProgram {
  title: string;
  description: string;
  startDate: string;
  status: string;
}
