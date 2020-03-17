import React from 'react';
import { Card, Button } from 'react-bootstrap'


const Company = (props) => {
    const { company } = props.location.params
    console.log(company)
    return <Card>
        <Card.Body>
            <Card.Title>{company.name}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{company.city}</Card.Subtitle>
            <Card.Text></Card.Text>
            <Card.Text>
                Some quick example text to build on the card title and make up the bulk of
                the card's content.
    </Card.Text>
            <Button variant="primary">See chart</Button>
        </Card.Body>
    </Card>
}

export default Company