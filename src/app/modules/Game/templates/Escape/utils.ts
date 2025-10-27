type WallsLine = number[]
type ID = number[]
type IDLine = ID[]

export interface EscapeItem {
    top: boolean
    left: boolean
    right: boolean
    botton: boolean
    positionX: number
    positionY: number
    visible: boolean
}
export type EscapeLine = EscapeItem[]
export type EscapeMap = EscapeLine[]

export const generateLab = (size: number) => {
    let id = 1
    const ids: IDLine[] = []
    const walls: WallsLine[] = []
    const rights = []
    const bottom: WallsLine[] = []
    const lab: EscapeMap = []
    for (let i = 0; i < size; i++) {
        const right_line = []
        const bottom_line: WallsLine = []
        let walls_line: WallsLine = []

        if (i === 0) {
            walls_line = []
            for (let j = 0; j < size; j++) {
                right_line.push(0)
                bottom_line.push(0)
                walls_line.push(id)
                id++
            }
        } else {
            walls_line = walls[i - 1]
            for (let j = 0; j < size; j++) {
                if (bottom[i - 1][j]) {
                    walls_line[j] = id
                    id++
                }
            }
        }

        for (let j = 0; j < size; j++) {
            if (j < size - 1) {
                if (walls_line[j] === walls_line[j + 1]) {
                    right_line[j] = 1
                }
            }
        }

        if (i < size - 1) {
            for (let j = 0; j < size; j++) {
                const wall: number = booleanRand() || right_line[j]
                right_line[j] = wall
                if (!wall && j < size - 1) {
                    walls_line[j + 1] = walls_line[j]
                }
                const key: ID = [i, j]
                if (!ids[walls_line[j]]) {
                    ids[walls_line[j]] = []
                }
                ids[walls_line[j]].push(key)
            }
        }

        for (let j = 0; j < size; j++) {
            const wall = booleanRand()
            if (wall) {
                const k = walls_line[j]
                let count = 0
                walls_line.forEach((ck, cj) => {
                    if (ck == k && !bottom_line[cj]) {
                        count++
                    }
                })
                if (count > 1) {
                    bottom_line[j] = 1
                }
            }
        }

        walls.push(walls_line)
        rights.push(right_line)
        bottom.push(bottom_line)
    }

    const xR = booleanRand()
    const yR = booleanRand()

    if (yR) {
        for (let i = 0; i < size; i++) {
            const itemLine = []
            if (xR) {
                for (let j = 0; j < size; j++) {
                    const item = getItem(i, j, size, bottom, rights, xR, yR)

                    itemLine.push(item)
                }
            } else {
                for (let j = size - 1; j >= 0; j--) {
                    const item = getItem(i, j, size, bottom, rights, xR, yR)

                    itemLine.push(item)
                }
            }
            lab.push(itemLine)
        }
    } else {
        for (let i = size - 1; i >= 0; i--) {
            const itemLine = []
            if (xR) {
                for (let j = 0; j < size; j++) {
                    const item = getItem(i, j, size, bottom, rights, xR, yR)

                    itemLine.push(item)
                }
            } else {
                for (let j = size - 1; j >= 0; j--) {
                    const item = getItem(i, j, size, bottom, rights, xR, yR)

                    itemLine.push(item)
                }
            }
            lab.push(itemLine)
        }
    }

    return lab
}

const getItem = (
    i: number,
    j: number,
    size: number,
    bottom: WallsLine[],
    rights: WallsLine[],
    xR: number,
    yR: number
) => {
    let top = false
    let left = false
    let right = false
    let botton = false
    if (i == 0 && j == 0) {
        top = true
    } else {
        if (i == 0) {
            top = true
        } else {
            if (bottom[i - 1][j]) {
                top = true
            }
        }
        if (j == 0) {
            left = true
        } else {
            if (rights[i][j - 1]) {
                left = true
            }
        }
    }

    if (rights[i][j] || j == size - 1) {
        right = true
    }

    if (bottom[i][j] || i == size - 1) {
        botton = true
    }

    const item = {
        top: yR ? top : botton,
        left: xR ? left : right,
        botton: yR ? botton : top,
        right: xR ? right : left,
        positionX: j,
        positionY: i,
        visible: false,
    }

    return item
}

const booleanRand = () => (Math.random() < 0.5 ? 0 : 1)
