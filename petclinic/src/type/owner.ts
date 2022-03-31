import { pet } from "./pet"

export type owner = {
    id:number
    firstName:string
    lastName:string
    address: string
    city: string
    telephone: string
    pets: pet[]
}