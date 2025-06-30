import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { loggedOut } from "../../services/apiAuth";

export function useLogOut() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: logout, isLoading } = useMutation({
    mutationFn: loggedOut,
    onSuccess: () => {
      navigate("/login", { replace: true });
      queryClient.removeQueries();
    },
  });

  return { logout, isLoading };
}
