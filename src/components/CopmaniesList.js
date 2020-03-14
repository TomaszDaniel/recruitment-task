import React, { useContext, useState } from 'react';

import { CompaniesContext } from '../context/companies-context'

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
            return <div
                key={company.id}>
                {company.id} {company.name} {company.city} {(company.totalIncomes) && company.totalIncomes}
            </div>
        })
    } else {
        list = searchedCompanies.map(company => {
            return <div
                key={company.id}>
                {company.id} {company.name} {company.city} {(company.totalIncomes) && company.totalIncomes}
            </div>
        })
    }

    return (
        <div>
            <input type="text" onChange={(e) => inputChange(e)} />
            {list}
        </div>
    );
}

export default CompaniesList;
