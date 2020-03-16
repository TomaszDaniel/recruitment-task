import React, { useContext, useState } from 'react';

import { CompaniesContext } from '../../context/companies-context'
import { Button, Table } from 'react-bootstrap';

const CompaniesList = ({ companies }) => {

    let list
    if (companies.length !== 0) {
        list = companies.map(company => {
            return <tr key={company.id}>
                <td>{company.id}</td>
                <td>{company.name}</td>
                <td>{company.city}</td>
                <td>{(company.totalIncomes) && company.totalIncomes}</td>
                <td><Button>View</Button></td>
            </tr>
        })
    }

    return (
        <div>
            <Table striped bordered hover size="sm" variant="dark" responsive="sm">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>City</th>
                        <th>Total Incomes</th>
                    </tr>
                </thead>
                <tbody>
                    {list}
                </tbody>
            </Table>
        </div>
    );
}

export default CompaniesList;
