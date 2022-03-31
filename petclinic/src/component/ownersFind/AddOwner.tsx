import axios from "axios";
import { useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { backend_url } from "../../const/const";
import { owner } from "../../type/owner";
import Owner from "./Owner";

type prop = {
    editOwner?: owner
    navigate: NavigateFunction
}

const AddOwner: React.FC<prop> = (prop: prop) => {
    const [firstName, setFirstName] = useState<string>(prop.editOwner?.firstName || '');
    const [lastName, setLastName] = useState<string>(prop.editOwner?.lastName || '');
    const [address, setAddress] = useState<string>(prop.editOwner?.address || '');
    const [city, setCity] = useState<string>(prop.editOwner?.city || '');
    const [telephone, setTelephone] = useState<string>(prop.editOwner?.telephone || '');


    const addOwner = () => axios.post(`http://${backend_url}/owners/new`, {

        firstName: firstName,
        lastName: lastName,
        address: address,
        city: city,
        telephone: telephone

    }).then(res => {
        prop.navigate(`/owners/find/owner/${res.data.id}`);
    }).catch(e => console.log(e))

    const editOwner = () => axios.post(`http://${backend_url}/owners/${prop.editOwner?.id}/edit`, {
        firstName: firstName,
        lastName: lastName,
        address: address,
        city: city,
        telephone: telephone
    }).then(res => {
        prop.navigate(`/owners/find/owner/${res.data}`);
    }).catch(e => console.log(e))


    const submitButton = prop.editOwner ?
        <button className="btn btn-primary" onClick={() => editOwner()}>Edit Owner</button>
        : <button className="btn btn-primary" onClick={() => addOwner()}>Add Owner</button>

    return (
        <>
            <h2>Owner</h2>
            <div className="form-group has-feedback">
                <div className="form-group">
                    <label className="col-sm-2 control-label">First Name</label>
                    <div className="col-sm-10">
                        <div>
                            <input className="form-control" type="text" id="firstName" name="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                        </div>
                        <span className="fa fa-ok form-control-feedback" aria-hidden="true"></span>
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-2 control-label">Last Name</label>
                    <div className="col-sm-10">
                        <div>
                            <input className="form-control" type="text" id="lastName" name="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                        </div>
                        <span className="fa fa-ok form-control-feedback" aria-hidden="true"></span>
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-2 control-label">Address</label>
                    <div className="col-sm-10">
                        <div>
                            <input className="form-control" type="text" id="address" name="address" value={address} onChange={(e) => setAddress(e.target.value)} />
                        </div>
                        <span className="fa fa-ok form-control-feedback" aria-hidden="true"></span>

                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-2 control-label">City</label>
                    <div className="col-sm-10">
                        <div>
                            <input className="form-control" type="text" id="city" name="city" value={city} onChange={(e) => setCity(e.target.value)} />
                        </div>
                        <span className="fa fa-ok form-control-feedback" aria-hidden="true"></span>

                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-2 control-label">Telephone</label>
                    <div className="col-sm-10">
                        <div>
                            <input className="form-control" type="text" id="telephone" name="telephone" value={telephone} onChange={(e) => setTelephone(e.target.value)} />
                        </div>
                        <span className="fa fa-ok form-control-feedback" aria-hidden="true"></span>

                    </div>
                </div>
            </div>
            <div className="form-group">
                <div className="col-sm-offset-2 col-sm-10">
                    {submitButton}
                </div>
            </div>

        </>
    )
}

export default AddOwner;