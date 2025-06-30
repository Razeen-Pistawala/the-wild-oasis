import Button from "../../ui/Button";
import { useCheckOut } from "./useCheckOut";

function CheckoutButton({ bookingId }) {
  const { checkOut, isLoading } = useCheckOut();
  return (
    <Button
      disabled={isLoading}
      variation="primary"
      size="small"
      onClick={() => checkOut(bookingId)}
    >
      Check out
    </Button>
  );
}

export default CheckoutButton;
