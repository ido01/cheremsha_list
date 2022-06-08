interface cropImageProps {
    image: string
    x: number
    y: number
    width: number
    height: number
    fileName: string
}

export const cropImage = (conf: cropImageProps) => {
    return new Promise<File>(function (resolve) {
        const img = new Image()
        img.onload = function () {
            const canvas = document.createElement('canvas')
            canvas.width = conf.width
            canvas.height = conf.height
            const ctx = canvas.getContext('2d')

            ctx?.drawImage(img, conf.x, conf.y, conf.width, conf.height, 0, 0, conf.width, conf.height)
            const base64ImageData = canvas.toDataURL('image/png')
            fetch(base64ImageData)
                .then((res) => res.blob())
                .then((blob) => {
                    const file = new File([blob], conf.fileName)
                    resolve(file)
                })
        }
        img.src = conf.image
    })
}
