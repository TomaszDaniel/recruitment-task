import React from 'react';

import { Pagination } from 'react-bootstrap'

const Paginate = ({ companiesPerPage, totalCompanies, paginate }) => {
    let active = 2;
    const items = []
    for (let number = 1; Math.ceil(totalCompanies / companiesPerPage); number++) {
        items.push(
            <Pagination.Item key={number} active={number === active} onClick={() => paginate(number)}>
                {number}
            </Pagination.Item>
        );
    }

    return <Pagination>
        {items}
    </Pagination>

}

export default Paginate