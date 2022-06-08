const keys =
    Object.keys ||
    function (obj) {
        if (obj !== Object(obj)) {
            throw new TypeError('Invalid object')
        }

        const keys = []

        for (const key in obj) {
            keys[keys.length] = key
        }

        return keys
    }

export const getMatchedMask = (value: string, masks: string[]) => {
    const match = /[0-9]/
    const replace = '9'
    const definitions: { [key: string]: RegExp } = {
        '#': new RegExp('[0-9]'),
    }

    let maskValue = ''

    for (let i = 0; i < value.length; i++) {
        const char = value.charAt(i)

        if (char == '') {
            break
        }

        if (match.test(char)) {
            maskValue += char
        }
    }

    for (const mid in masks) {
        let mask = masks[mid]
        let pass = true
        let valueIndex = 0
        let maskIndex = 0

        for (; valueIndex < maskValue.length && maskIndex < mask.length; ) {
            const maskChar: string = mask.charAt(maskIndex)
            const valueChar = maskValue.charAt(valueIndex)

            if (!match.test(maskChar) && !(maskChar in definitions)) {
                maskIndex++
                continue
            }
            if ((maskChar in definitions && definitions[maskChar].test(valueChar)) || valueChar == maskChar) {
                valueIndex++
                maskIndex++
            } else {
                pass = false

                break
            }
        }

        if (pass && valueIndex == maskValue.length) {
            mask = mask.replace(new RegExp([match.source].concat(Object.keys(definitions)).join('|'), 'g'), replace)

            return mask
        }
    }

    return false
}
