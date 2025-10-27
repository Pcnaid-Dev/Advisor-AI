
export type ID = string;

export type Workspace = { 
  id: ID; 
  name: string; 
  branding?: { color?: string; logoUrl?: string } 
};

export type Department = 'Executive' | 'Operations' | 'Finance' | 'HR' | 'Legal' | 'Marketing' | 'Compliance' | 'IT';

export type Customer = { 
  id: ID; 
  name: string; 
  tags: string[] 
};

export type Entity = { 
  id: ID; 
  customerId: ID; 
  name: string; 
  status: 'Active'|'Suspended'; 
  primaryDriveUrl?: string 
};

export type Location = { 
  id: ID; 
  entityId: ID; 
  name: string; 
  status: 'Scouting'|'Open'|'Closed'; 
  address?: string; 
  hours?: string 
};

export type Permit = { 
  id: ID; 
  locationId: ID; 
  type: string; 
  status: 'Draft'|'Submitted'|'Approved'|'Expired'; 
  due?: string 
};

export type Project = { 
  id: ID; 
  scope: 'Customer'|'Entity'|'Location'; 
  refId: ID; 
  name: string; 
  status: 'To Do'|'In Progress'|'Done' 
};

export type Task = { 
  id: ID; 
  projectId: ID; 
  title: string; 
  assigneeId?: ID; 
  due?: string; 
  status: 'To Do'|'In Progress'|'Done' 
};

export type FinanceTransaction = { 
  id: ID; 
  locationId: ID; 
  date: string; 
  amount: number; 
  category: string; 
  memo?: string 
};

export type Vendor = { 
  id: ID; 
  name: string; 
  contacts?: string[] 
};

export type Employee = { 
  id: ID; 
  name: string; 
  role: string; 
  locationIds: ID[] 
};

export type Permission = `${string}:${'read'|'write'|'admin'}`;

export type Role = { 
  name: string; 
  permissions: Permission[] 
};

export type Document = { 
  id: ID; 
  ownerType: 'Customer'|'Entity'|'Location'; 
  ownerId: ID; 
  title: string; 
  url?: string; 
  tags: string[] 
};

export interface Message {
  role: 'user' | 'model';
  content: string;
}
