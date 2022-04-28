import React, { useEffect, useState } from 'react';
import { Card, Row } from 'react-bootstrap';

import { getCurrUser } from '../../api/apiRequest.js';
import { getRelativeTime } from '../../api/helper';

function Message(props) {
    const defaultStyle = {
        color: "white"
    }

    const senderStyle = {
        textAlign: "right",
        backgroundColor: "mediumslateblue",
        borderRadius: "20px",
        display: "inline-block",
        padding: "10px 15px",
        width: "fit-content", 
    }

    const receiverStyle = {
        textAlign: "left",
        backgroundColor: "gray",
        borderRadius: "20px",
        display: "inline-block",
        padding: "10px 15px",
        width: "fit-content", 
    }

    const senderStyleBlock = {
        padding: "20 10",
        margin: "5px 10px",
        color: "white",
        borderRadius: "20px",
        display: "flex",
        justifyContent: "right",
        textAlign: "right"
    }

    const receiverStyleBlock = {
        padding: "20 10",
        margin: "5px 10px",
        color: "white",
        borderRadius: "20px",
        display: "flex",
        justifyContent: "left",
        textAlign: "left",
    }

    const [styling, setStyling] = useState(defaultStyle);

    const updateCurr = () => {
        getCurrUser().then(res => {
            console.log(res)
            const curr = res.curr_user;

            if (curr == props.sender) {
                setStyling(senderStyle);
            } else {
                setStyling(receiverStyle);
            }
        }).catch(err => console.error(`Error: ${err}`));
    }

    useEffect(() => {
        //updateCurr();
        console.log(props.curr);
        
        if (props.curr == props.sender) {
            setStyling(receiverStyle);
        } else {
            setStyling(senderStyle);
        }
    }, []);

    const time = () => {
        const t = getRelativeTime(props.time);

        if (t == "some time ago") {
            return "";
        }

        return t;
    }

    return (
        <Row style={(props.curr == props.sender) ? receiverStyleBlock : senderStyleBlock}>
            <div >
                <p style={{margin: "0px", color: "black"}}>
                    {time()}
                </p>
            </div>

            <div style={styling}>
                <p style={{margin: "0px"}}>
                    {props.message}
                </p>
            </div>
        </Row>
    )
}

export default Message;