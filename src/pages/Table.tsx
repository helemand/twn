import axios from "axios";
import Paginator from "../components/Paginator";
import { useState } from "react";
import { SortColumn, SortOrder, Fields, QueryResult, Person } from "../types";
import TableHeader from "../components/Table/TableHeader";
import TableBody from "../components/Table/TableBody";
import Loader from "../components/Loader";
import { useFetchData } from "../hooks/useFetchData";

const Table = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortColumn, setSortColumn] = useState<SortColumn>("firstname");
  const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.ASC);
  const itemsPerPage = 10;

  const fields: Fields = {
    firstname: "Eesnimi",
    surname: "Perekonnanimi",
    sex: "Sugu",
    personal_code: "Sünnikuupäev",
    phone: "Telefon",
  };

  const { isError, isPending, data, error } = useFetchData<QueryResult>({
    queryKey: ["tableData"],
    queryFn: async () => {
      const response = await axios.get<QueryResult>(
        `https://midaiganes.irw.ee/api/list?limit=500`
      );
      return response.data;
    },
  });

  const totalPages = Math.ceil((data?.list.length || 200) / itemsPerPage);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleSortChange = (column: SortColumn) => {
    setSortOrder((prevOrder) =>
      sortColumn === column
        ? prevOrder === SortOrder.ASC
          ? SortOrder.DESC
          : SortOrder.ASC
        : SortOrder.ASC
    );
    setSortColumn(column);
  };

  const sortPersons = <K extends keyof Person>(
    persons: Person[],
    sortColumn: K,
    order: SortOrder
  ) => {
    return [...persons].sort((a, b) => {
      const [valueA, valueB] = [String(a[sortColumn]), String(b[sortColumn])];
      return order === SortOrder.ASC
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
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
