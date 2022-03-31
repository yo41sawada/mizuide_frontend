import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { backend_url } from "../../const/const";
import { findOwnersResult } from "../../type/findOwnersResult";
import { owner } from "../../type/owner";
import Pager from "../Pager";

type prop = {
}

const OwnersList: React.FC<prop> = (prop: prop) => {

    const [findOwnersResult, setFindOwnersResult] = useState<findOwnersResult>();

    const OwnerRow: React.FC<{ owner: owner }> = (prop) => {
        const pets = prop.owner.pets.map(p => p.name)

        return (
            <tr>
                <td>
                    <Link to={`/owners/find/owner/${prop.owner.id}`}>{prop.owner.firstName} {prop.owner.lastName}</Link>
                </td>
                <td>{prop.owner.address}</td>
                <td>{prop.owner.city}</td>
                <td>{prop.owner.telephone}</td>
                <td><span>{pets.join(', ')}</span></td>
            </tr>

        )
    }

    const [searchParam] = useSearchParams();
    useEffect(() => {
        let lastName = searchParam.get('lastName') || ''
        let page = searchParam.get('page') || 1
        axios.get(`http://${backend_url}/owners`, { params: { lastName: lastName, page: page } })
            .then(res => setFindOwnersResult(res.data))
    }, [searchParam])

    const ownerRows = findOwnersResult?.listOwners.map((o, i) => <OwnerRow key={i} owner={o} />)


    return (
        <>
            <h2>Owners</h2>
            <table id="owners" className="table table-striped">
                <thead>
                    <tr>
                        <th style={{ width: '150px' }}>Name</th>
                        <th style={{ width: '200px' }}>Address</th>
                        <th>City</th>
                        <th style={{ width: '120px' }}>Telephone</th>
                        <th>Pets</th>
                    </tr>
                </thead>
                <tbody>
                    {ownerRows}
                </tbody>
            </table>
            <Pager linkUrl={`/owners/find/owners?lastName=${searchParam.get('lastName')}`} currentPage={findOwnersResult?.currentPage || 0}
                totalPages={findOwnersResult?.totalPages || 0} />

        </>
    )
}

export default OwnersList;