import React, { useContext } from 'react';
import { Link } from 'react-router-dom'

import { CompaniesContext } from '../../context/companies-context'
import { Button, Table, Spinner } from 'react-bootstrap';

const CompaniesList = ({ companies }) => {

    const { dataLoaded } = useContext(CompaniesContext)

    let list
    if (companies.length !== 0) {
        list = companies.map(company => {
            return <tr key={company.id}>
                <td>{company.id}</td>
                <td>{company.name}</td>
                <td>{company.city}</td>
                <td>{(dataLoaded) ? company.totalIncomes : <Spinner animation="border" />}</td>
                <td>
                    <Link to={{
                        pathname: `/company/${company.id}`,
                        params: {
                            company
                        }
                    }}>
                        <Button size="sm" disabled={!dataLoaded}>View details</Button>
                    </Link>
                </td>
            </tr >
        })
    }
    return (
        <div>
            <Table striped bordered hover size="sm" responsive="sm">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>City</th>
                        <th>Total Incomes</th>
                        <th>Details</th>
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
