import { useSearchParams } from "react-router";
import Select from "./Select";

function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get("sortBy") || "";

  function handleChange(e) {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  }

  return (
    <Select
      type="white"
      options={options}
      value={sortBy}
      onChange={handleChange}
    />
  );
}

export default SortBy;
