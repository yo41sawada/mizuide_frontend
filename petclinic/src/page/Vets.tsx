import axios from "axios";
import { ReactElement, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Pager from "../component/Pager";
import { backend_url } from "../const/const";
import { findVetsResult } from "../type/findVetsResult";
import { vet } from "../type/vet";

type prop = {

}

const Vets: React.FC<prop> = (prop: prop) => {
  const VetRow: React.FC<{ vet: vet }> = (prop: { vet: vet }) => {
    let specialtiesData = prop.vet.specialties?.map(s => <span>{s.name} </span>)
    console.log(prop.vet.specialties);
    if (specialtiesData.length === 0)
      specialtiesData = [<span>none</span>]
    return (
      <tr>
        <td>{prop.vet.firstName} {prop.vet.lastName}</td>
        <td>{specialtiesData}</td>
      </tr>
    )
  }
  const [findVetsResult, setFindVetsResult] = useState<findVetsResult>();
  const [searchParam] = useSearchParams();
  useEffect(() => {
    let page = searchParam.get('page') || 1
    axios.get<findVetsResult>(`http://${backend_url}/vets/show`, { params: { page: page } }).then(res => {
      setFindVetsResult(res.data)
    })
  }, [searchParam])

  const vetRows = findVetsResult?.listVets.map((vet, index) => <VetRow key={index} vet={vet} />)
  return (
    <>

      <h2>Veterinarians</h2>

      <table id="vets" className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Specialties</th>
          </tr>
        </thead>
        <tbody>
          {vetRows}
        </tbody>
      </table>
      <Pager linkUrl={`/vets`} currentPage={findVetsResult?.currentPage || 0}
        totalPages={findVetsResult?.totalPages || 0} />
    </>
  )
}

export default Vets;