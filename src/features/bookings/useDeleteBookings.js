import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

export function useDeleteBookings() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: deleteBooking, isLoading: isDeletingBooking } = useMutation({
    mutationFn: (bookingId) => deleteBookingApi(bookingId),
    onSuccess: () => {
      toast.success("Booking Successfully Deleted");
      navigate("/bookings");
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
    },
    onError: () => {
      toast.error("There was an issue in deleting the booking ");
    },
  });

  return { deleteBooking, isDeletingBooking };
}
