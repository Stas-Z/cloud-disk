interface ValidationError {
    type: string
    value: string
    msg: string
    path: string
    location: string
}

export interface MappedErrors {
    [key: string]: ValidationError
}

export function filterMessages(obj: MappedErrors): string[] {
    const messages: string[] = []
    Object.keys(obj).forEach((key) => {
        // eslint-disable-next-line no-prototype-builtins
        if (obj[key].hasOwnProperty('msg')) {
            messages.unshift(obj[key].msg)
        }
    })
    return messages
}
