import axios from "axios";
import { useState } from "react";
import { Navigate, NavigateFunction } from "react-router-dom";
import { backend_url } from "../../const/const";
import { owner } from "../../type/owner";
import { pet } from "../../type/pet";

type prop = {
    editPet?: pet
    editOwner?: owner
    navigate: NavigateFunction
}

const AddVisit: React.FC<prop> = (prop: prop) => {
    const [date, setDate] = useState<string>('')
    const [description, setDescription] = useState<string>('')


    const visitRows = prop.editPet?.visits.map(v => <tr><td>{v.date}</td><td>{v.description}</td></tr>)
    const addVisit = () => axios.post(`http://${backend_url}/owners/${prop.editOwner?.id}/pets/${prop.editPet?.id}/visits/new`, { date: date, description: description })
            .then(res => prop.navigate(`owner/${res.data}`))
    return (
        <>

            <h2>
                New
                Visit
            </h2>

            <b>Pet</b>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Birth Date</th>
                        <th>Type</th>
                        <th>Owner</th>
                    </tr>
                </thead>
                <tbody><tr>
                    <td>{prop.editPet?.name}</td>
                    <td>{prop.editPet?.birthDate}</td>
                    <td>{prop.editPet?.type.name}</td>
                    <td>{prop.editOwner?.firstName} {prop.editOwner?.lastName}</td>
                </tr>
                </tbody></table>

                <div className="form-group has-feedback">

                    <div className="form-group">
                        <label className="col-sm-2 control-label">Date</label>
                        <div className="col-sm-10">
                            <div>
                                <input className="form-control" type="date" id="date" name="date" value={date} onChange={(e) => setDate(e.target.value)} />
                            </div>
                            <span className="fa fa-ok form-control-feedback" aria-hidden="true"></span>
                        </div>
                    </div>


                    <div className="form-group">
                        <label className="col-sm-2 control-label">Description</label>
                        <div className="col-sm-10">
                            <div>
                                <input className="form-control" type="text" id="description" name="description" value={description} onChange={(e) => setDescription(e.target.value)} />
                            </div>
                            <span className="fa fa-ok form-control-feedback" aria-hidden="true"></span>

                        </div>
                    </div>

                </div>

                <div className="form-group">
                    <div className="col-sm-offset-2 col-sm-10">
                        <button className="btn btn-primary" onClick={() => addVisit()}>Add Visit</button>
                    </div>
                </div>

            <br />
            <b>Previous Visits</b>
            <table className="table table-striped">
                <tbody>
                    <tr>
                        <th>Date</th>
                        <th>Description</th>
                    </tr>
                    {visitRows}
                </tbody></table>
        </>
    )
}

export default AddVisit;