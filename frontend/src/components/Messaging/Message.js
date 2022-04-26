import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';

function Message(props) {


    return (
        <Card>
            <Card.Header>
                {props.sender}
            </Card.Header>

            <Card.Body>
                {props.message}
            </Card.Body>

            <Card.Footer>
                {props.time}
            </Card.Footer>
        </Card>
    )
}

export default Message;