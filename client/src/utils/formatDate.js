export const formatDate = (date) => {
    const v = date ? new Date(date) : new Date()
        return v.toISOString().split('T', 1);
}