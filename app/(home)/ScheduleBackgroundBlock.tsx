import {parseTime} from '@/app/(home)/ScheduleClass';


type ScheduleBackgroundBlockProps = {
    start: string,
    end: string
}
export default function ScheduleBackgroundBlock(props: ScheduleBackgroundBlockProps) {
    return (
        <div
            style={{gridRowStart: parseTime(props.start), gridRowEnd: parseTime(props.end), gridColumnStart: 1, gridColumnEnd: 4}}
            className="-z-10 bg-content-secondary dark:bg-content-secondary-dark rounded-l"
        />
    )
}
