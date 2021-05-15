export const validateEmail = (val) => {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(val)
}

export const validateYYYYMMDD = (val) => {
    const regex = /^\d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])$/;
    return regex.test(val);
}

export const validateYYYYMM = (val) => {
    const regex = /^\d{4}-(0?[1-9]|1[012])$/;
    return regex.test(val);
}