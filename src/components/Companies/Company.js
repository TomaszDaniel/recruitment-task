import React, { useState } from 'react';
import { Card, Button, Collapse } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'
import DatePicker from 'react-datepicker'
import Chart from "react-apexcharts";

import "react-datepicker/dist/react-datepicker.css";

const Company = (props) => {
    const [totalCustomIncomes, setTotalCustomIncomes] = useState()
    const [averageCustomIncomes, setAverageCustomIncomes] = useState()
    const [startDate, setStartDate] = useState(new Date("2019/01/01"));
    const [endDate, setEndDate] = useState(new Date());
    const [open, setOpen] = useState(false);
    const [showChart, setShowChart] = useState(false)
    const [chart, setChart] = useState({
        options: {
            chart: {
                id: "basic-bar"
            },
            xaxis: {
                categories: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
            }
        },
        series: [
            {
                name: "",
                data: []
            }
        ]
    })

    if (props.location.params === undefined) {
        return <Redirect to="/" />
    }

    const { company } = props.location.params

    const getLastMonthIncomes = () => {
        let lastMonthIncomes = 0
        const data = new Date()
        company.incomes.forEach((comp) => {
            if ((new Date(comp.date).getFullYear() === data.getFullYear() - 1) && (new Date(comp.date).getMonth() === data.getMonth() - 1)) {
                lastMonthIncomes += Number(comp.value)
            }
        })
        return lastMonthIncomes
    }

    const getMonthlyIncomes = () => {
        const dataPerMonth = []
        for (let i = 0; i <= 11; i++) {
            let incomesPerMonth = 0
            company.incomes.forEach(el => {
                if (new Date(el.date).getMonth() === i) {
                    incomesPerMonth += Number(el.value)
                }
            })
            dataPerMonth.push(incomesPerMonth.toFixed())
        }
        setChart(prev => {
            return {
                ...prev,
                series: [{
                    name: "month-incomes",
                    data: dataPerMonth
                }],
            }
        })
        setShowChart(true)
    }

    const changePicker = (date, picker) => {
        switch (picker) {
            case 'startPicker':
                setStartDate(date)
                break;
            case 'endPicker':
                setEndDate(date)
                break;
            default:
                setStartDate(new Date("2019/01/01"))
                setEndDate(new Date())
        }
    }

    const getCustomData = () => {
        let customData = []
        customData = company.incomes.filter(el => {
            const dates = new Date(el.date)
            return (dates.getTime() > startDate.getTime()) && (dates.getTime() < endDate.getTime())
        })
        let totalCustomIncomes = 0
        customData.forEach(el => {
            totalCustomIncomes += Number(el.value)
        })
        setTotalCustomIncomes(totalCustomIncomes.toFixed(2))
        setAverageCustomIncomes((totalCustomIncomes / customData.length).toFixed(2))
    }

    return <>
        <Card>
            <Card.Body>
                <Card.Title>{company.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">City: {company.city}</Card.Subtitle>
                <Card.Text>Total Incomes: {company.totalIncomes}</Card.Text>
                <Card.Text>Average Incomes: {(company.totalIncomes / company.incomes.length).toFixed(2)}</Card.Text>
                <Card.Text>Last Month Incomes: {getLastMonthIncomes()}</Card.Text>


                <Button
                    onClick={() => setOpen(!open)}
                    aria-controls="example-collapse-text"
                    aria-expanded={open}
                >
                    Show Custom Data
      </Button>
                <Collapse in={open}>
                    <div id="example-collapse-text">
                        <Button variant="primary" size="sm" className="my-4 mx-2" onClick={() => getCustomData()}>Get</Button>
                        <DatePicker
                            selected={startDate}
                            onChange={date => changePicker(date, "startPicker")}
                            selectsStart
                            startDate={startDate}
                            endDate={endDate}
                        />
                        <DatePicker
                            selected={endDate}
                            onChange={date => changePicker(date, "endPicker")}
                            selectsEnd
                            startDate={startDate}
                            endDate={endDate}
                            minDate={startDate}
                            className="ml-3"
                        />
                        <Card.Text>Total Custom Incomes: {(!!totalCustomIncomes ? totalCustomIncomes : "---")}</Card.Text>
                        <Card.Text>Average Custom Incomes: {!!averageCustomIncomes ? averageCustomIncomes : "---"}</Card.Text>
                    </div>
                </Collapse>




                <Button variant="primary" className="ml-3" onClick={() => getMonthlyIncomes()}>Get Chart</Button>
                <Button variant="primary" onClick={() => props.history.push("/")}>Back to Main Page</Button>
            </Card.Body>
        </Card >
        {showChart && <Chart
            options={chart.options}
            series={chart.series}
            type="bar"
            style={{ width: "100%" }}
        />}
    </>

}

export default Company