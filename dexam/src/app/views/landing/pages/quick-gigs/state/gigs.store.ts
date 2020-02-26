import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
// import { Tweet } from './tweet.model';
// import { Tweet } from './tweet.model';
import {Gig} from "./gig.model";

export interface GigsState extends EntityState<Gig> {
    hasMore: boolean;
    page: number;
}

const initialState: GigsState = {
    hasMore: true,
    page: 1
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'gigs' })
export class GigsStore extends EntityStore<GigsState, Gig> {

    constructor() {
        super(initialState);
    }

    updatePage(page: { hasMore: boolean, page: number }) {
        this.update(page);
    }

}
