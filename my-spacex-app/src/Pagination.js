import "./pagination.css";

function Pagination(props) {
  const pageNumbers = Array.from(
    { length: props.nPages },
    (_, index) => index + 1
  );

  return (
    <nav className="pagination-nav-wrapper">
      <ul className="pagination-list">
        {pageNumbers.map((pageNumber) => (
          <li key={pageNumber}>
            <button
              className={`page-number ${
                props.currentPage === pageNumber ? "active-page-number" : ""
              }`}
              onClick={() => props.setCurrentPage(pageNumber)}>
              {pageNumber}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Pagination;
