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

export function createLocation(locations: string[], name: string): string {
    let location = "";
    if (locations.length > 1) {
        for (let i = 0; i < locations.length - 1; i++) location += `/${locations[i]}`;
        location += `/${name}`;
    }

    else location += name;
    
    return location;
}