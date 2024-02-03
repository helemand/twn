import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Paginator from "../components/Paginator";
import { SortColumn, SortOrder, Fields, Person } from "../types";
import TableHeader from "../components/Table/TableHeader";
import TableBody from "../components/Table/TableBody";
import Loader from "../components/Loader";
import { getTableData } from "../api";

const Table = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortColumn, setSortColumn] = useState<SortColumn>("firstname");
  const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.ASC);
  const itemsPerPage = 10;

  const fields: Fields = {
    firstname: "Eesnimi",
    surname: "Perekonnanimi",
    sex: "Sugu",
    birthday: "Sünnikuupäev",
    phone: "Telefon",
  };

  const { isPending, data } = useQuery({
    queryKey: ["tableData"],
    queryFn: getTableData,
    throwOnError: true,
  });

  const totalPages = Math.ceil((data?.list.length || 200) / itemsPerPage);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleSortChange = (column: SortColumn) => {
    setSortOrder((prevOrder) => {
      if (sortColumn === column) {
        if (prevOrder === SortOrder.ASC) {
          return SortOrder.DESC;
        }
        if (prevOrder === SortOrder.DESC) {
          return SortOrder.DEFAULT;
        }
        return SortOrder.ASC;
      }
      setSortColumn(column);
      return SortOrder.ASC;
    });
  };

  const sortPersons = <K extends keyof Person>(
    persons: Person[],
    column: K,
    order: SortOrder,
  ) =>
    [...persons].sort((a, b) => {
      const [valueA, valueB] = [String(a[column]), String(b[column])];

      if (order === SortOrder.ASC) {
        return valueA.localeCompare(valueB);
      }
      if (order === SortOrder.DESC) {
        return valueB.localeCompare(valueA);
      }
      return 0;
    });

  if (isPending || !data) return <Loader />;

  return (
    <>
      <h1>nimekiri</h1>
      {isPending && <Loader />}
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <TableHeader
                fields={fields}
                sortColumn={sortColumn}
                sortOrder={sortOrder}
                handleSortChange={handleSortChange}
              />
            </tr>
          </thead>
          <tbody>
            <TableBody
              data={sortPersons(data.list, sortColumn, sortOrder)}
              currentPage={currentPage}
            />
          </tbody>
        </table>
      </div>
      <Paginator
        onPageChange={handlePageChange}
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </>
  );
};

export default Table;
