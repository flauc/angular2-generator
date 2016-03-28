export function capitalize(value: string): string {
    return value.charAt(0).toUpperCase() + value.slice(1)
}

export function lower(value: string): string {
    return value.charAt(0).toLowerCase() + value.slice(1)
}

export function stringMultiply(initial: string, times: number): string {
    let timesFixed = Math.round(times),
        final = ``;

    for (let i = 0; i < timesFixed; i++) final += initial;

    return final;
}