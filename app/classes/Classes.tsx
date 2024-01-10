'use client'

import {useMemo, useState} from 'react';
import Class from '@/app/classes/Class';
import type {Section} from '@/util/unitime';


export default function Classes(props: {classes: {[id: string]: Section}}) {
    const [query, setQuery] = useState('');

    const filtered = useMemo(() => {
        // Allow filtering by course name (e.g. "SCLA 101") and course title (e.g. "Crit Think & Com").
        const classes = query === ''
            ? Object.values(props.classes)
            : Object.values(props.classes).filter(c => c.titles.some((t) => t.toLowerCase().includes(query.toLowerCase()))
                || c.names.some((n) => n.toLowerCase().includes(query.toLowerCase())))

        // Sort first by course name (e.g. "SCLA 101"), then by section id (e.g. "10670-P09"). Assumedly, two courses
        // with the same name also have the same title.
        return classes.sort((a, b) => a.names[0].localeCompare(b.names[0])
            || a.sections[0].localeCompare(b.sections[0]));
    }, [query])

    return (
        <div className="flex-grow">
            <section className="mb-6">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="border border-tertiary dark:border-tertiary-dark rounded px-3 py-1.5 focus:outline-none focus-visible:ring-[3px] w-full mb-1 dark:bg-content-secondary-dark placeholder:text-secondary dark:placeholder:text-secondary-dark"
                    placeholder="Search classes by name (SCLA 101) or title (Multivariate Calculus)"
                />
                <p className="text-xs font-light text-secondary dark:text-secondary-dark">
                    Viewing {Math.min(100, filtered.length)} of {filtered.length} courses.
                </p>
            </section>

            <section className="flex flex-col gap-4">
                {filtered.slice(0, 100).map(c => <Class {...c} key={c.sections[0]} />)}
            </section>
        </div>
    )
}
