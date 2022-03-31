import { petType } from "./petType"
import { visit } from "./visit"

export type pet = {
    id:number
    name:string
    birthDate: string
    type: petType
    visits: visit[]
}