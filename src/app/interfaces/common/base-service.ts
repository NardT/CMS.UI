import { Observable } from "rxjs"
import { PaginationResponse } from "./pagination-response"

export interface BaseService<T> {
    search(keyword: string, pageIndex: number, pageSize: number, orderBy?: string[]): Observable<PaginationResponse<T>>
    add(addRequest: T): Observable<T>
    update(id: string, editRequest: T): Observable<T> 
    delete(id: string): Observable<T>
}
