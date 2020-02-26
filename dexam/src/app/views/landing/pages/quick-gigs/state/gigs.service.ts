import { Injectable } from '@angular/core';
// import { TweetsStore } from './tweets.store';
// import { getTweets } from '../tweets.data';
import { getGigs } from './gigs.data';
import { transaction } from '@datorama/akita';
import {GigsStore} from "./gigs.store";

@Injectable({ providedIn: 'root' })
export class GigsService {
    constructor(private gigsStore: GigsStore) { }

    get(page: number) {
        this.gigsStore.setLoading(true);
        getGigs({ page }).subscribe(res => this.updateGigs(res));
    }

    @transaction()
    private updateGigs(res) {
        const nextPage = res.currentPage + 1;
        this.gigsStore.add(res.data);
        this.gigsStore.updatePage({ hasMore: res.hasMore, page: nextPage });
        this.gigsStore.setLoading(false);
    }
}
