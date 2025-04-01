'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getDepartments } from './actions';
import { useNavigation } from '@/lib/context/NavigationContext';

export default function DepartmentsPage() {
  const { setNavCurrentPage } = useNavigation();
  const [departments, setDepartments] = React.useState<any[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    setNavCurrentPage({
      title: 'Departments',
      breadcrumbs: [
        { title: 'Home', href: '/' },
        { title: 'Departments', href: '/departments' }
      ]
    });
  }, [setNavCurrentPage]);

  useEffect(() => {
    async function loadDepartments() {
      try {
        const data = await getDepartments();
        setDepartments(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading departments:', error);
        setIsLoading(false);
      }
    }

    loadDepartments();
  }, []);

  if (isLoading) {
    return <div className="department-page">Loading departments...</div>;
  }

  return (
    <div className="department-page">
      <div className="department-header">
        <h1 className="department-title">Departments</h1>
        <p className="department-description">
          Explore the different departments at Space Industries International.
          Each department plays a crucial role in our mission to advance space exploration and technology.
        </p>
      </div>

      <div className="departments-grid">
        {departments.map((department) => (
          <Link 
            href={`/departments/${department.id}`} 
            key={department.id}
            className="department-card"
          >
            <div className="department-card-image">
              <div className="department-placeholder-image">
                <div className="department-silhouette"></div>
              </div>
            </div>
            <div className="department-card-content">
              <h2 className="department-card-title">{department.shortTitle}</h2>
              <p className="department-card-description">{department.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}