import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import AddOwner from "../component/ownersFind/AddOwner";
import AddPet from "../component/ownersFind/AddPet";
import AddVisit from "../component/ownersFind/AddVisit";
import FindOwners from "../component/ownersFind/FindOwners";
import Owner from "../component/ownersFind/Owner";
import OwnersList from "../component/ownersFind/OwnersList";
import { findOwnersResult } from "../type/findOwnersResult";
import { owner } from "../type/owner";
import { pet } from "../type/pet";

type prop = {
}

const OwnersFind: React.FC<prop> = (prop: prop) => {

    const navigate = useNavigate();
    const [findOwnerResult, setFindOwnerResult] = useState<findOwnersResult>()
    const [editOwner, setEditOwner] = useState<owner>()
    const [editPet, setEditPet] = useState<pet>()
    return (
        <>
            <Routes>
                <Route path="" element={<FindOwners navigate={navigate} setPageResult={setFindOwnerResult} />} />
                <Route path="/owners" element={<OwnersList />} />
                <Route path="/add" element={<AddOwner navigate={navigate} />} />
                <Route path="/edit" element={<AddOwner navigate={navigate} editOwner={editOwner} />} />
                <Route path="/owner/:ownerId" element={<Owner navigate={navigate} setEditOwner={setEditOwner} setEditPet={setEditPet} />} />
                <Route path="/:ownerId/add/pet" element={<AddPet navigate={navigate} editOwner={editOwner} />} />
                <Route path="/:ownerId/edit/pet" element={<AddPet navigate={navigate} editOwner={editOwner} editPet={editPet} />} />
                <Route path="/visit" element={<AddVisit navigate={navigate} editOwner={editOwner} editPet={editPet} />} />

            </Routes>
        </>
    )
}

export default OwnersFind;