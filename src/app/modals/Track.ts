import { Guid } from 'guid-typescript';

export interface Track
{
    mbid:Guid,
    id : string,
    name : string,
    artist : string,
    url : string,
    streamable: string,
    listeners : number
}