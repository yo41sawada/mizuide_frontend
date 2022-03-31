import axios from "axios";
import { useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { backend_url } from "../../const/const";
import { findOwnersResult } from "../../type/findOwnersResult";
import { owner } from "../../type/owner";

type prop = {
    navigate: NavigateFunction
    setPageResult: React.Dispatch<React.SetStateAction<findOwnersResult | undefined>>
}

const FindOwners: React.FC<prop> = (prop: prop) => {
    const [lastName, setLastName] = useState<string>('');

    const fetchOwner = () => {
        axios.get(`http://${backend_url}/owners`, { params: { lastName: lastName } }).
            then(res => {
                let findOwnerResult = res.data
                if (findOwnerResult.listOwners.length === 1) {
                    navigate(`owner?ownerId=${findOwnerResult.listOwners[0].id}`)
                } else if (findOwnerResult.listOwners.length > 1) {
                    navigate(`owners?lastName=${lastName}`)
                }
            }
            )
    }

    const navigate = useNavigate();
    const goToAddPage = () => navigate('add')

    return (
        <>
            <h2>Find Owners</h2>
            <div className="form-horizontal" id="search-owner-form">
                <div className="form-group">
                    <div className="control-group" id="lastNameGroup">
                        <label className="col-sm-2 control-label">Last name </label>
                        <div className="col-sm-10">
                            <input className="form-control" size={30} value={lastName} onChange={(e) => setLastName(e.target.value)}
                                maxLength={80} /> <span className="help-inline">
                                {/* <div
                                    th:if="${#fields.hasAnyErrors()}">
                                <p th:each="err : ${#fields.allErrors()}" th:text="${err}">Error</p> */}
                                {/* </div> */}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-sm-offset-2 col-sm-10">
                        <button onClick={() => fetchOwner()} className="btn btn-primary">Find
                            Owner</button>
                    </div>
                </div>

                <a className="btn btn-primary" onClick={() => goToAddPage()}>Add Owner</a>
            </div>
        </>

    )
}

export default FindOwners;