export const handleFilter = (query, list) => {
    const result = list.filter(el => el.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
    return result;
}

export const handleFilterObject = (query, list) => {
    const result = list.filter(el => el.name.concat(el.inn).concat(el.kpp).toLowerCase().indexOf(query.toLowerCase()) !== -1);
    return result;
}

export const handleFilterRemains = (query, list) => {
    const result = list.filter(el => el.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
    return result;
}

export const handleFilterContracts = (query, list) => {
    const result = list.filter(el => el.vendor.name.concat(el.vendor.inn).concat(el.payer.name).concat(el.contract_number).toLowerCase().indexOf(query.toLowerCase()) !== -1);
    return result;
}