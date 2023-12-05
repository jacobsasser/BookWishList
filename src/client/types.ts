export type Authors = {
    key:string,
    name:string
}
export type QueryResult = {
    key:string,
    title:string,
    edition_count:number,
    cover_id:number,
    cover_edition_key:string,
    subject:string[],
    ia_collection:string[],
    lendinglibrary:boolean,
    printdisabled:boolean,
    lending_edition:string,
    lending_identifier:string,
    authors:Authors[],
    first_publish_year:number,
    ia:string|null,
    public_scan:boolean,
    has_fulltest:boolean
}