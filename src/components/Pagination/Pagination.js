import React from 'react';

import { Pagination } from 'react-bootstrap'

const Paginate = ({ companiesPerPage, totalCompanies, paginate, activePage }) => {
    const active = activePage;
    const items = []
    for (let number = 1; number <= Math.ceil(totalCompanies / companiesPerPage); number++) {
        items.push(
            <Pagination.Item key={number} active={number === active} onClick={() => paginate(number)}>
                {number}
            </Pagination.Item>
        );
    }

    return <Pagination className="d-flex flex-wrap">
        {items}
    </Pagination>

}

export default Paginate