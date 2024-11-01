export const rules = {
    email: value => {
        const pattern = /^[A-Za-z0-9\._]+@{1}[A-Za-z0-9]+\.[a-z]+$/
        return pattern.test(value) || 'Неверный email'
    },
    notNull: value => {
        return (value !== null && value !== undefined && value !== '') || 'Поле не может быть пустым';
    },
    id: value => {
        return (value !== null && value !== undefined && typeof value == 'number') || 'Неверный id';
    },
    price: value => {
        return (typeof value == 'number' || typeof value == 'undefined' || value === null) || 'Стоимость должна быть числом';
    },
    isNumber: value => {
        return /^\d+[\.,\,]?\d*$/.test(value);
    }
}
