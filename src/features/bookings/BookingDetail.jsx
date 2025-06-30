import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "./useBooking";
import Spinner from "../../ui/Spinner";
import { useNavigate } from "react-router";
import {
  HiArrowDownOnSquare,
  HiArrowUpOnSquare,
  HiTrash,
} from "react-icons/hi2";
import { useCheckOut } from "../check-in-out/useCheckOut";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useDeleteBookings } from "./useDeleteBookings";
import Empty from "../../ui/Empty";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { data: booking, isLoading } = useBooking();
  const { deleteBooking, isDeletingBooking } = useDeleteBookings();
  const navigate = useNavigate();

  const moveBack = useMoveBack();
  const { checkOut, isLoading: isCheckingOut } = useCheckOut();

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  if (isLoading) return <Spinner />;
  if (!booking) return <Empty resourceName="booking" />;
  const { status, id: bookingId } = booking;

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <Modal>
        <ButtonGroup>
          <Modal.Open opens="delete">
            <Button variation="danger" opens="delete" icon={<HiTrash />}>
              Delete Booking
            </Button>
          </Modal.Open>
          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName="bookings"
              onConfirm={() => deleteBooking(bookingId)}
              disabled={isDeletingBooking}
            />
          </Modal.Window>

          {status === "unconfirmed" && (
            <Button
              onClick={() => navigate(`/checkin/${bookingId}`)}
              icon={<HiArrowDownOnSquare />}
            >
              Proceed to Check in
            </Button>
          )}
          {status === "checked-in" && (
            <Button
              onClick={() => checkOut(bookingId)}
              icon={<HiArrowUpOnSquare />}
              disabled={isCheckingOut}
            >
              Check Out
            </Button>
          )}
          <Button variation="secondary" onClick={moveBack}>
            Back
          </Button>
        </ButtonGroup>
      </Modal>
    </>
  );
}

export default BookingDetail;
