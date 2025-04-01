'use server';

import departmentsData from '@/data/departments.json';

export async function getDepartments() {
  return departmentsData;
}

export async function getDepartmentById(id: string) {
  return departmentsData.find((department: any) => department.id === id) || null;
}

export async function getRelatedDepartments(currentDepartmentId: string, limit: number = 3) {
  // Filter out the current department and return up to 'limit' other departments
  return departmentsData
    .filter((department: any) => department.id !== currentDepartmentId)
    .slice(0, limit);
}