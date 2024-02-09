import {NextResponse} from 'next/server';
import {DateTime} from 'luxon';
import type {EventsResponse} from '@/util/boilerlink';


/**
 * API route to cache BoilerLink API requests for efficient querying. Returns events for a given day, provided in ISO
 * format in the path params.
 */
export async function GET(request: Request, {params}: {params: {date: string}}) {
    // Query only for events that start *on* the requested day.
    const rangeStart = DateTime.fromISO(params.date);
    const rangeEnd = rangeStart.plus({days: 1});

    console.log(params.date, rangeStart.toISO(), rangeEnd.toISO());
    console.log(`https://boilerlink.purdue.edu/api/discovery/event/search?startsAfter=${rangeStart.toISO()}&startsBefore=${rangeEnd.toISO()}&orderByField=startsOn&orderByDirection=ascending&status=Approved&take=100&query=`);

    const res: EventsResponse = await (await fetch(`https://boilerlink.purdue.edu/api/discovery/event/search?startsAfter=${rangeStart.toISO()}&startsBefore=${rangeEnd.toISO()}&orderByField=startsOn&orderByDirection=ascending&status=Approved&take=100&query=`)).json()
    return NextResponse.json(res);
}
