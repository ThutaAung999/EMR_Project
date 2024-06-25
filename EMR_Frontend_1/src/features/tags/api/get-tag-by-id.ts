import { useQuery } from '@tanstack/react-query';
import { ITag } from '../model/ITag';

//--------------------------
const fetchTagById = async (id: string): Promise<ITag> => {
  const response = await fetch(`http://localhost:9999/api/tags/${id}`);
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to fetch tag data');
  }

  return response.json();
};

export const useGetTagById = (id: string) => {
  return useQuery<ITag>({
    queryKey: ['tag', id],
    queryFn: () => fetchTagById(id),
    enabled: !!id, // Only run the query if the id is not null or undefined
  });
};