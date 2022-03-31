import axios from "axios";
import { ReactElement, useEffect, useState } from "react";
import { Link, NavigateFunction, useParams } from "react-router-dom";
import { backend_url } from "../../const/const";
import { owner } from "../../type/owner";
import { pet } from "../../type/pet";
import { visit } from "../../type/visit";

type prop = {
    navigate: NavigateFunction
    setEditOwner: React.Dispatch<React.SetStateAction<owner | undefined>>
    setEditPet: React.Dispatch<React.SetStateAction<pet | undefined>>
}

const Owner: React.FC<prop> = (prop: prop) => {
    const { ownerId } = useParams()
    const [owner, setOwner] = useState<owner>()

    useEffect(() => {
        axios.get(`http://${backend_url}/owners/${ownerId}`).then(res => setOwner(res.data))
    }, [ownerId])

    type petTableProp = {
        pet: pet
        owner?: owner
    }
    const PetTable: React.FC<petTableProp> = (petTableProp: petTableProp) => {
        const VisitRow: React.FC<{ visit: visit }> = (prop: { visit: visit }) => (
            <tr>
                <td>{prop.visit.date}</td>
                <td>{prop.visit.description}</td>
            </tr>
        )
        const [visitRows, setVisitRows] = useState<ReactElement[]>([])
        useEffect(() => {
            if (petTableProp.pet.visits) {
                let tmp = []
                let i = 0
                for (let visit of petTableProp.pet.visits) {
                    tmp.push(<VisitRow key={i} visit={visit} />)
                    i++
                }
                setVisitRows(tmp)
            }
        }
            , [petTableProp])
        return (
            <tr>
                <td valign="top">
                    <dl className="dl-horizontal">
                        <dt>Name</dt>
                        <dd>{petTableProp.pet.name}</dd>
                        <dt>Birth Date</dt>
                        <dd>{petTableProp.pet.birthDate}</dd>
                        <dt>Type</dt>
                        <dd>{petTableProp.pet.type.name}</dd>
                    </dl>
                </td>
                <td valign="top">
                    <table className="table-condensed">
                        <thead>
                            <tr>
                                <th>Visit Date</th>
                                <th>Description</th>
                            </tr>
                            {visitRows}
                        </thead>
                        <tbody>

                            <tr>
                                <td><Link  to={`/owners/find/${ownerId}/edit/pet`} onClick={() => {
                                    prop.setEditPet(petTableProp.pet)
                                    prop.setEditOwner(petTableProp.owner)
                                }}>Edit
                                    Pet</Link></td>
                                <td><Link to={`/owners/find/visit`}
                                    onClick={() => {
                                        prop.setEditPet(petTableProp.pet)
                                        prop.setEditOwner(petTableProp.owner)
                                    }}
                                >Add
                                    Visit</Link></td>
                            </tr>
                        </tbody></table>
                </td>
            </tr>

        )
    }
    const [petTables, setPetTables] = useState<ReactElement[]>([]);

    useEffect(() => {
        if (owner?.pets) {
            let tmp = []
            let i = 0
            for (let pet of owner?.pets) {
                tmp.push(<PetTable key={i} pet={pet} owner={owner}></PetTable>)
                i++
            }
            setPetTables(tmp)
        }
    }
        , [owner])

    return (
        <>
            <div className="container xd-container">
                <h2>Owner Information</h2>

                <table className="table table-striped">
                    <tbody><tr>
                        <th>Name</th>
                        <td><b>{owner?.firstName} {owner?.lastName}</b></td>
                    </tr>
                        <tr>
                            <th>Address</th>
                            <td>{owner?.address}</td>
                        </tr>
                        <tr>
                            <th>City</th>
                            <td>{owner?.city}</td>
                        </tr>
                        <tr>
                            <th>Telephone</th>
                            <td>{owner?.telephone}</td>
                        </tr>
                    </tbody></table>

                <a className="btn btn-primary" onClick={() => {
                    prop.navigate(`edit`);
                    prop.setEditOwner(owner)
                }}>Edit
                    Owner</a>
                <a onClick={() => {
                    prop.navigate(`${owner?.id}/add/pet`)
                    prop.setEditOwner(owner)
                }
                } className="btn btn-primary">Add
                    New Pet</a>

                <br />
                <br />
                <br />
                <h2>Pets and Visits</h2>

                <table className="table table-striped">
                    <tbody>
                        {petTables}
                    </tbody>
                </table>

            </div>
        </>
    )
}

export default Owner;