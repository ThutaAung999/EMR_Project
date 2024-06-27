import { useQuery } from '@tanstack/react-query';
import { IPatient } from '../model/IPatient';

//--------------------------
const fetchPatientById = async (id: string): Promise<IPatient> => {
  const response = await fetch(`http://localhost:9999/api/emrs/${id}`);
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to fetch patient data');
  }

  return response.json();
};

export const useGetPatientById = (id: string) => {
  return useQuery<IPatient>({
    queryKey: ['patient', id],
    queryFn: () => fetchPatientById(id),
    enabled: !!id, // Only run the query if the id is not null or undefined
  });
};