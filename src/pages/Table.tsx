import Paginator from "../components/Paginator";
import { useState } from "react";
import { SortColumn, SortOrder, Fields, Persons, Person } from "../types";
import TableHeader from "../components/Table/TableHeader";
import TableBody from "../components/Table/TableBody";
import Loader from "../components/Loader";
import useFetchData from "../hooks/useFetchData";
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

  const { isError, isPending, data, error } = useFetchData<Persons>({
    queryKey: ["tableData"],
    queryFn: getTableData,
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
        } else if (prevOrder === SortOrder.DESC) {
          return SortOrder.DEFAULT;
        } else {
          return SortOrder.ASC;
        }
      } else {
        setSortColumn(column);
        return SortOrder.ASC;
      }
    });
  };

  const sortPersons = <K extends keyof Person>(
    persons: Person[],
    sortColumn: K,
    order: SortOrder
  ) => {
    return [...persons].sort((a, b) => {
      const [valueA, valueB] = [String(a[sortColumn]), String(b[sortColumn])];

      if (order === SortOrder.ASC) {
        return valueA.localeCompare(valueB);
      } else if (order === SortOrder.DESC) {
        return valueB.localeCompare(valueA);
      } else {
        return 0;
      }
    });
  };

  if (isPending) return <Loader />;

  if (isError) return "An error has occurred: " + error?.message;

  return (
    <div className="container">
      <div className="inner">
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
      </div>
    </div>
  );
};

export default Table;
