import { Search } from "./search";

export interface PaginationFilter {
    advanceSearch: Search,
    keyword: string,
    pageNumber: number,
    pageSize: number,
    orderBy?: string[]
}
