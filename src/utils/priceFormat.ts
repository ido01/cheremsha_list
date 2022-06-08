export const priceFormat = (price: number) => {
    const displayPrice = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
    return `${displayPrice} ₽`
}
