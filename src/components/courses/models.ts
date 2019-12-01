
export interface Student {
  username: string;
  sid: number;
  qid: number;
  status: string;
  assignedTeacher?: Teacher;
}

export interface Teacher {
  username: string;
  email?: string;
  tid: string;
  status?: string;
}
