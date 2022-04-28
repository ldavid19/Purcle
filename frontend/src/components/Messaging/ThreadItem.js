import React, { useEffect, useState } from 'react';
import { ListGroup, Row } from 'react-bootstrap';
import { Link } from "react-router-dom";

import { getContext } from '../../api/apiRequest.js';
import { getRelativeTime } from '../../api/helper';

function ThreadItem(props) {
    //const [thread, setThread] = useState(null);
    const [lastMessage, setLastMessage] = useState("You don't have any messages in this conversation yet.");
    const [lastTime, setTime] = useState("");
    const [receiver, setReceiver] = useState("...");

    const updateUsername = (thread) => {
        console.log(props.currUser);
        console.log(thread.user);

        if (props.currUser === thread.user) {
            setReceiver(thread.receivername);
        } else {
            setReceiver(thread.username);
        }
    }

    const getThreadInfo = () => {
        getContext(props.id).then((res) => {
            //setThread(res.thread);

            updateUsername(res.thread);

            const msgList = res.message_list;
            
            const lastMsgObj = msgList[msgList.length - 1];

            const lastMsgBody = lastMsgObj.body;
            const lastMsgTime = lastMsgObj.date;

            setLastMessage(lastMsgBody);
            setTime(lastMsgTime);
        })
    }

    const time = () => {
        const t = getRelativeTime(lastTime);

        if (t == "some time ago") {
            return "";
        }

        return "| " + t;
    }

    useEffect(() => {
        getThreadInfo();
    }, [])

    return (
        <ListGroup.Item style={{textAlign: "left", textDecoration: "none"}}>
            <Link to={{pathname: `/inbox/` + props.id}} style={{textAlign: "left", textDecoration: "none"}}>
                <Row>
                    <h2>{receiver}</h2>
                </Row>
                
                <Row style={{fontStyle: "italic"}}>
                    <p>{lastMessage} {time()}</p>
                </Row>
            </Link>
        </ListGroup.Item>
        
        
    );
}

export default ThreadItem;