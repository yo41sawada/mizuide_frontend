import axios from "axios";
import { ReactElement, useEffect, useState } from "react";
import { NavigateFunction, useParams } from "react-router-dom";
import { backend_url } from "../../const/const";
import { owner } from "../../type/owner";
import { pet } from "../../type/pet";
import { petType } from "../../type/petType";

type prop = {
    navigate: NavigateFunction
    editOwner?: owner
    editPet?: pet
}

const AddPet: React.FC<prop> = (prop: prop) => {
    const [options, setOptions] = useState<ReactElement[]>([]);

    const optionsSet = (petTypes: petType[]) => {
        let tmp = []
        let i = 0
        for (let pt of petTypes)
            tmp.push(<option key={i++} value={pt.id}>{pt.name}</option>)
        setOptions(tmp)
    }

    useEffect(() => { axios.get(`http://${backend_url}/petType`).then(res => optionsSet(res.data)) }, [])

    const [name, setName] = useState<string>(prop.editPet?.name || '');
    const [birthDate, setBirthDate] = useState<string>(prop.editPet?.birthDate || '');
    const [typeId, setType] = useState<string>(prop.editPet?.type.id.toString() || '5')

    const { ownerId } = useParams();
    const addPet = () => axios.post(`http://${backend_url}/owners/${ownerId}/pets/new`, {
        ownerId: ownerId, pet: {
            name: name,
            birthDate: birthDate,
            type: { id: typeId }
        }
    }).then(res => prop.navigate(`owner/${res.data}`))

    const editPet = () => axios.post(`http://${backend_url}/owners/${ownerId}/pets/${prop.editPet?.id}/edit`, {
        ownerId: ownerId, pet: {
            id: prop.editPet?.id,
            name: name,
            birthDate: birthDate,
            type: { id: typeId }
        }
    }).then(res => prop.navigate(`owner/${res.data}`))

    const submitButton = prop.editPet ?
        <button className="btn btn-primary" onClick={() => editPet()}>Edit Pet</button>
        : <button className="btn btn-primary" onClick={() => addPet()}>Add Pet</button>


    return (
        <>
            <h2>New Pet</h2>
            <div className="form-group has-feedback">
                <div className="form-group">
                    <label className="col-sm-2 control-label">Owner</label>
                    <div className="col-sm-10">
                        <span>{prop.editOwner?.firstName} {prop.editOwner?.lastName}</span>
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-2 control-label">Name</label>
                    <div className="col-sm-10">
                        <div>
                            <input className="form-control" type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <span className="fa fa-ok form-control-feedback" aria-hidden="true"></span>

                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-2 control-label">Birth Date</label>
                    <div className="col-sm-10">
                        <div>
                            <input className="form-control" type="date" id="birthDate" name="birthDate" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} />
                        </div>
                        <span className="fa fa-ok form-control-feedback" aria-hidden="true"></span>
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-2 control-label">Type</label>
                    <div className="col-sm-10">
                        <select value={typeId} onChange={(e) => setType(e.target.value)} id="type" name="type">
                            {options}
                        </select>
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

export default AddPet;