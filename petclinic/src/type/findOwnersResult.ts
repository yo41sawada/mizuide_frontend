import { owner } from "./owner"

export type findOwnersResult = {
    currentPage: number
    totalPages: number
    totalItems: number
    listOwners: owner[]
}