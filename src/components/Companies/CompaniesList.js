import React, { useContext, useState } from 'react';

import Companies from './Companies'
import Paginate from '../Pagination/Pagination'
import { CompaniesContext } from '../../context/companies-context'

const CompaniesList = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [companiesPerPage] = useState(10)

    const companies = useContext(CompaniesContext).companies
    const searchedCompanies = useContext(CompaniesContext).searchedCompanies
    const searchCompany = useContext(CompaniesContext).searchCompany
    const [touched, setTouched] = useState(false)

    const inputChange = (e) => {
        searchCompany(e.target.value)
        if (e.target.value !== '') {
            setTouched(true)
            setCurrentPage(1)
        } else {
            setTouched(false)
        }
    }

    const IndexOfLastCompany = currentPage * companiesPerPage
    const IndexOfFirstCompany = IndexOfLastCompany - companiesPerPage
    const currentCompanies = (!touched ? companies.slice(IndexOfFirstCompany, IndexOfLastCompany) : searchedCompanies.slice(IndexOfFirstCompany, IndexOfLastCompany))

    const paginate = (pageNumber) => setCurrentPage(pageNumber)

    return <>
        <input type="text" onChange={(e) => inputChange(e)} />
        <Companies
            companies={currentCompanies}
        />
        <Paginate
            companiesPerPage={companiesPerPage}
            totalCompanies={searchedCompanies.length === 0 ? companies.length : searchedCompanies.length}
            paginate={paginate}
            activePage={currentPage}
        />
    </>
}

export default CompaniesList