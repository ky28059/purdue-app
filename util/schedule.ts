import {DateTime} from 'luxon';
import type {UserData} from '@/contexts/UserDataContext';
import type {Classes} from '@/contexts/ClassesContext';
import type {Events} from '@/contexts/EventsContext';
import type {Section, SectionType} from '@/util/unitime';
import type {BoilerLinkEventData} from '@/util/boilerlink';


export const ZONE = 'America/Indiana/Indianapolis';
export const YEAR_START = DateTime.fromISO('2023-08-21', {zone: ZONE});
export const YEAR_END = DateTime.fromISO('2024-05-04', {zone: ZONE})


export type PeriodType = SectionType | 'Event';

type PeriodBase = {
    name: string,
    location: string,
    s: number, // Minutes after midnight EST
    e: number
}
export type SectionPeriod = PeriodBase & {
    type: SectionType,
    section: Section // TODO: naming, more efficient abstraction?
}
export type EventPeriod = PeriodBase & {
    type: 'Event',
    event: BoilerLinkEventData
}

type Period = SectionPeriod | EventPeriod;

/**
 * Get the schedule periods happening on a given day, sorted by start time. Returned periods include classes,
 * events, and generally anything on the schedule for a given day.
 *
 * @param date The date to get the blocks for.
 * @param data The user's `UserData` object.
 * @param classes The classes map.
 * @param events The events map.
 * @returns The array of "blocks" occurring on a given day.
 */
export function getPeriodsForDay(
    date: DateTime,
    data: UserData,
    classes: Classes,
    events: Events
) {
    // Classes for the given day
    const classPeriods = data.courseIds.map((id) => classes[id]).filter((c) => {
        switch (date.weekday) {
            case 1: return c.dayOfWeek.includes('M');
            case 2: return /T(?!h)/.test(c.dayOfWeek);
            case 3: return c.dayOfWeek.includes('W');
            case 4: return c.dayOfWeek.includes('Th');
            case 5: return c.dayOfWeek.includes('F');
        }
        return false;
    }).map<SectionPeriod>((c) => ({
        type: c.type,
        name: c.names[0], // TODO?
        location: c.location,
        s: parseUnitimeMinutes(c.start),
        e: parseUnitimeMinutes(c.end),
        section: c
    }));

    // Events for the given day
    const blEventPeriods = events[date.toISODate()!]?.filter((e) => data.eventIds.includes(e.id)).map<EventPeriod>((e) => {
        const start = DateTime.fromISO(e.startsOn);
        const end = DateTime.fromISO(e.endsOn);

        // const isSameDay = start.hasSame(end, 'day');
        // if (!isSameDay) return null; // TODO

        const midnight = start.startOf('day');

        return {
            type: 'Event',
            name: e.name,
            location: e.location,
            s: start.diff(midnight, 'minutes').minutes,
            e: end.diff(midnight, 'minutes').minutes,
            event: e
        }
    });

    const periods: Period[] = blEventPeriods
        ? [...classPeriods, ...blEventPeriods]
        : classPeriods

    return periods.sort((a, b) => a.s - b.s);
}

/**
 * Parses a UniTime time string into its corresponding number of minutes from 12:00 AM.
 * @param time The string to parse.
 * @returns The number of minutes from midnight this string represents.
 */
export function parseUnitimeMinutes(time: string) {
    if (time === 'noon') return 720;

    // Parse AM/PM time string, subtracting 84 because the grid starts at 7:00 AM and adding one for indexing.
    let [hour, minute] = time.slice(0, time.length - 1).split(':').map(s => Number(s));
    if (time.endsWith('p') && hour != 12) hour += 12;

    return hour * 60 + minute;
}
