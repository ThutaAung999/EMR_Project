import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IDisease } from "../model/IDisease";

// DELETE hook (delete patient in api)
export function useDeleteDisease() {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: async (diseaseId: string) => {
        const response = await fetch(
          `http://localhost:9999/api/diseases/${diseaseId}`,
          {
            method: "DELETE",
          }
        );
        if (!response.ok) {
          throw new Error("Error occurred while deleting");
        }
        return response.json();
      },
      onMutate: (diseaseId: string) => {
        queryClient.setQueryData<IDisease[]>(["diseases"], (prevDiseases = []) =>
          prevDiseases.filter((disease) => disease._id !== diseaseId)
        );
      },
      onSettled: () => queryClient.invalidateQueries({ queryKey: ["diseases"] }),
    });
  }
  