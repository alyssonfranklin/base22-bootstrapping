import { Metadata } from 'next';
import { getDepartmentById } from '../actions';

type Props = {
  params: {
    id: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const department = await getDepartmentById(params.id);
  
  if (!department) {
    return {
      title: 'Department Not Found',
      description: 'The requested department could not be found.'
    };
  }
  
  return {
    title: `${department.title} | Space Industries Departments`,
    description: department.description || 'Learn about our department at Space Industries.',
  };
}