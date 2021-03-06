import React, { useState, useEffect, createContext } from "react";

export const CompaniesContext = createContext({
    companies: [],
    searchCompany: () => { },
    searchedCompanies: [],
    loading: false
})

export default props => {

    const [companies, setCompanies] = useState([])
    const [searchedCompanies, setSearchedCompanies] = useState([])
    const [dataLoaded, setDataLoaded] = useState(false)

    useEffect(() => {
        let companiesList
        async function fetchData() {
            await fetch('https://recruitment.hal.skygate.io/companies')
                .then(r => r.json())
                .then(response => companiesList = response)
            setCompanies(companiesList)
            let incomesDatas = []
            for (let i = 0; i < companiesList.length; i++) {
                await fetch(`https://recruitment.hal.skygate.io/incomes/${companiesList[i].id}`)
                    .then(r => r.json())
                    .then(response => incomesDatas.push(response))
            }
            setCompanies(() => {
                let newState = []
                companiesList.forEach((item, index) => {
                    let counter = 0
                    incomesDatas[index].incomes.forEach(el => {
                        counter += Number(el.value)
                    })
                    let vv = Object.assign(item, incomesDatas[index], { totalIncomes: counter.toFixed(2) })
                    newState.push(vv)
                    newState.sort((a, b) => {
                        return b.totalIncomes - a.totalIncomes
                    })
                })
                return newState
            })
            setDataLoaded(true)
        }
        fetchData()
    }, [])

    const searchCompany = name => {
        let newState = companies.filter(company => company.name.toLowerCase().includes(name))
        setSearchedCompanies(newState)
    }

    return (
        <CompaniesContext.Provider value={{ companies, searchCompany, searchedCompanies, dataLoaded }}>
            {props.children}
        </CompaniesContext.Provider>
    )
}