import React from 'react'

const Pagination = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
    const pageNumbers = [];

    for(let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) 
        pageNumbers.push(i);

    const paginateTo = (pageNumber) => {
        if(pageNumber <= pageNumbers[pageNumbers.length - 1] && pageNumber >= pageNumbers[0]) {
            paginate(pageNumber);
        } else if(pageNumber > pageNumbers[pageNumbers.length - 1]) {
            paginate(pageNumbers[pageNumbers.length - 1]);
        } else if(pageNumber < pageNumbers[0]) {
            paginate(pageNumbers[0]);
        }
        
    }
    
    return (
        <nav className='pagination-nav'>
            <ul className='pagination pagination-list'>
                <li className='page-item'>
                    <a 
                        href='!#' 
                        onClick={() => paginate(pageNumbers[0])} 
                        className='page-link'
                    >
                        &lt;&lt;
                    </a>
                </li>
                <li className='page-item'>
                    <a 
                        href='!#' 
                        onClick={() => paginateTo(currentPage - 1)} 
                        className='page-link'
                    >
                        &lt;
                    </a>
                </li>
                {pageNumbers.map(number => (
                    <li 
                        key={number} 
                        className='page-item'
                    >
                        <a 
                            href='!#' 
                            onClick={() => paginate(number)} 
                            className={currentPage===number ? 'page-link pagination-anchor' : 'page-link'}
                        >
                            {number}
                        </a>
                    </li>
                ))}
                <li className='page-item'>
                    <a 
                        href='!#' 
                        onClick={() => paginateTo(currentPage + 1)} 
                        className='page-link'
                    >
                        &gt;
                    </a>
                </li>
                <li className='page-item'>
                    <a 
                        href='!#' 
                        onClick={() => paginate(pageNumbers[pageNumbers.length - 1])} 
                        className='page-link'
                    >
                        &gt;&gt;
                    </a>
                </li>
            </ul>
        </nav>
    )
}

export default Pagination;
