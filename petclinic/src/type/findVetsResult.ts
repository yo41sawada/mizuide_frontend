import { vet } from "./vet"

export type findVetsResult = {
    currentPage: number
    totalPages: number
    totalItems: number
    listVets: vet[]
}