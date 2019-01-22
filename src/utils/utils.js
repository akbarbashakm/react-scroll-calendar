import moment from 'moment';

export function isSameDate(firstDate, secondDate) {
    return (
        moment(firstDate, 'DD/MM/YYYY').diff(
            moment(secondDate, 'DD/MM/YYYY'),
            'days',
            false
        ) === 0
    );
}

export function isDisabled(minDate, currentDate, maxDate) {
    let min = moment(moment(minDate).format('DD/MM/YYYY'), 'DD/MM/YYYY');
    let max = moment(moment(maxDate).format('DD/MM/YYYY'), 'DD/MM/YYYY');
    let current = moment(moment(currentDate).format('DD/MM/YYYY'), 'DD/MM/YYYY');
    return !(min <= current && current <= max);
}