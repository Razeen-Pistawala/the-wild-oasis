import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useCheckOut() {
  const queryClient = useQueryClient();
  const { mutate: checkOut, isLoading } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfullly checked out`);
      queryClient.invalidateQueries({ active: true });
    },
    onError: (data) => {
      toast.error(`There was an error in checking out #${data.id} `);
    },
  });

  return { checkOut, isLoading };
}
