import axios from "axios";
import { useEffect, useState } from "react";
import pet from "../images/pets.png"
import { user } from "../type/user";

type prop = {
    userName?: string
}

const Welcome: React.FC<prop> = (prop: prop) => {

    return (
        <>
            <h2>Welcome {prop.userName}</h2>
            <div className="row">
                <div className="col-md-12">
                    <img className="img-responsive" src={pet} />
                </div>
            </div>
        </>
    )
}

export default Welcome;