export interface GetGameResponse {
    id:           number;
    name:         string;
    price:        string;
    genre:        string;
    description:  string;
    release_date: Date;
    total_sales:  number;
    created_at:   Date;
    updated_at:   Date;
}
