import { includes } from 'lodash'

import { masks } from './constants/masks'

export const getListOfMasks = () => {
    const defs = ['#']
    const match = /[0-9]|#/

    masks.sort((a, b) => {
        let ia = 0
        let ib = 0

        for (; ia < a.length && ib < b.length; ) {
            const cha = a.charAt(ia)
            const chb = b.charAt(ib)

            if (!match.test(cha)) {
                ia++
                continue
            }

            if (!match.test(chb)) {
                ib++
                continue
            }

            if (includes(defs, cha) && !includes(defs, chb)) {
                return 1
            }

            if (!includes(defs, cha) && includes(defs, chb)) {
                return -1
            }

            if (!includes(defs, cha) && !includes(defs, chb)) {
                if (cha != chb) {
                    return cha < chb ? -1 : 1
                }
            }

            ia++
            ib++
        }

        for (; ia < a.length || ib < b.length; ) {
            if (ia < a.length && !match.test(a.charAt(ia))) {
                ia++
                continue
            }

            if (ib < b.length && !match.test(b.charAt(ib))) {
                ib++
                continue
            }

            if (ia < a.length) {
                return 1
            }

            if (ib < b.length) {
                return -1
            }
        }

        return 0
    })

    return masks
}
