import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import "./Pagination.css";

// pagination, items
function PaginatedItems({ total, page, setPagination, itemsPerPage }) {
	const [pageCount, setPageCount] = useState(itemsPerPage);

	useEffect(() => {
		setPageCount(Math.ceil(total / itemsPerPage));
	}, [itemsPerPage, total]);

	// Invoke when user click to request another page.
	const handlePageClick = (event) => {	
		window.scrollTo(0, 100);
		console.log(`User requested page number ${event.selected}`);
		setPagination?.({page: event.selected + 1});
	};

	return (
		<>
			<ReactPaginate
				nextLabel={<ArrowForwardIosIcon size={"20px"} className="cursor-pointer"/>}
				onPageChange={handlePageClick}
				pageRangeDisplayed={3}
				marginPagesDisplayed={2}
				pageCount={pageCount}
				previousLabel={<ArrowBackIosIcon size={"10px"} className="cursor-pointer"/>}
				pageClassName="page-item"
				pageLinkClassName="page-link"
				previousClassName="prev-item"
				previousLinkClassName="page-link"
				nextClassName="next-item"
				nextLinkClassName="page-link"
				breakLabel="..."
				breakClassName="page-item"
				breakLinkClassName="page-link"
				containerClassName="pagination"
				activeClassName="active"
				forcePage={page}
				renderOnZeroPageCount={null}
			/>
		</>
	);
}

export default PaginatedItems;
