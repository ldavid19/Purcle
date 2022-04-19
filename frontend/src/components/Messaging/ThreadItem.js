import React, { useEffect, useState } from 'react';
import { ListGroup, Row, Col, Image, Ratio } from 'react-bootstrap';
import { Link } from "react-router-dom";

function ThreadItem(props) {



    return (
        <div>
                <Link to={{pathname: `/inbox/` + props.id}}>
                    {props.sendername}{"<->"}{props.receivername}
                </Link>
        </div>
        
        
    );
}

export default ThreadItem;