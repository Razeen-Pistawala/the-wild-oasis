import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { getBooking } from "../../services/apiBookings";

export function useBooking() {
  const { bookingId } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ["booking", bookingId],
    queryFn: () => getBooking(bookingId),
    retry: false,
  });

  return { data, isLoading, error };
}
