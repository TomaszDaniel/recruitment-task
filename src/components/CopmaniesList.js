import React, { useContext, useState } from 'react';

import { CompaniesContext } from '../context/companies-context'
import { Button, Table } from 'react-bootstrap';

const CompaniesList = () => {
    const companies = useContext(CompaniesContext).companies
    const searchedCompanies = useContext(CompaniesContext).searchedCompanies
    const searchCompany = useContext(CompaniesContext).searchCompany
    const [touched, setTouched] = useState(false)

    const inputChange = (e) => {
        searchCompany(e.target.value)
        if (e.target.value !== '') {
            setTouched(true)
        } else {
            setTouched(false)
        }
    }

    let list
    if (companies.length !== 0 && !touched) {
        list = companies.map(company => {
            return <tr key={company.id}>
                <td>{company.id}</td>
                <td>{company.name}</td>
                <td>{company.city}</td>
                <td>{(company.totalIncomes) && company.totalIncomes}</td>
            </tr>
        })
    } else {
        list = searchedCompanies.map(company => {
            return <tr key={company.id}>
                <td>{company.id}</td>
                <td>{company.name}</td>
                <td>{company.city}</td>
                <td>{(company.totalIncomes) && company.totalIncomes}</td>
            </tr>
        })
    }

    return (
        <div>
            <input type="text" onChange={(e) => inputChange(e)} />
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
