
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IEmr } from "../model/emr.model";

export function useUpdateEmr() {
  const queryClient = useQueryClient();

  const updateEmr = useMutation({
    mutationFn: async (updatedEmr: IEmr) => {
      const response = await fetch(`http://localhost:9999/api/emrs/${updatedEmr._id}`, {
        method: "PATCH", // or "PUT" if you prefer full update
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedEmr),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['emrs'] });
    },
  });

  return updateEmr;
}

