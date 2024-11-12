import axios from 'axios'

export const baseUrl = process.env.REACT_APP_API_URL;


const instanceWithToken = axios.create({
    withCredentials: false,
    baseURL: baseUrl
})

const token = document.getElementById('root_stock').getAttribute('token');

instanceWithToken.interceptors.request.use(config => {
    config.headers.Authorization = token
    return config
});

export const getStockRemains = () => {
    return instanceWithToken.get(`${baseUrl}api/purchases/stock/remains`);
}

export const getWithdraw = () => {
    return instanceWithToken.get(`${baseUrl}api/purchases/stock/logs?type=withdrawal`);
}

export const getOutcoming = () => {
    return instanceWithToken.get(`${baseUrl}api/purchases/stock/logs?type=outcoming`);
}

export const confirmOutcoming = (id) => {
    return instanceWithToken({
        method: 'post',
        mode: "cors",
        url: `${baseUrl}api/purchases/stock/logs`,
        data: { stock_stats_id: id }
    })
}


export const sendWithdrawal = (id, quantity) => {
    return instanceWithToken({
        method: 'post',
        mode: "cors",
        url: `${baseUrl}api/purchases/stock/remains`,
        data: { type: 'outcoming', stock_id: id, quantity: quantity }
    })
}

export const sendOutcoming = (id, quantity, comment) => {
    return instanceWithToken({
        method: 'post',
        mode: "cors",
        url: `${baseUrl}api/purchases/stock/remains`,
        data: { type: 'withdrawal', stock_id: id, quantity: quantity, comment: comment }
    })
}

export const getVendors = () => {
    return instanceWithToken.get(`${baseUrl}api/purchases/stock/vendors`);
}

export const addVendor = (name, inn, kpp) => {
    return instanceWithToken({
        method: 'post',
        mode: "cors",
        url: `${baseUrl}api/purchases/stock/vendors`,
        data: { name, inn, kpp }
    })
}


export const updateVendorIgnor = (id, state) => {
    return instanceWithToken({
        method: 'patch',
        mode: "cors",
        url: `${baseUrl}api/purchases/stock/vendors`,
        data: { stock_vendor_id: id, activate: state }
    })
}

export const getContracts = () => {
    return instanceWithToken.get(`${baseUrl}api/purchases/stock/contracts`);
}



export const addContract = (formdata) => {
    return instanceWithToken({
        method: 'post',
        mode: "cors",
        headers: {
            "Content-type": "multipart/form-data",
            "Accept": "application/json"
        },
        url: `${baseUrl}api/purchases/stock/contracts`,
        data: formdata
    })
}

export const editContract = (formdata) => {
    return instanceWithToken({
        method: 'post',
        mode: "cors",
        headers: {
            "Content-type": "multipart/form-data",
            "Accept": "application/json"
        },
        url: `${baseUrl}api/purchases/stock/contracts/edit`,
        data: formdata
    })
}

export const getFile = (path) => {
    return instanceWithToken({
        method: 'get',
        mode: "cors",
        headers: {
            "Accept": "/"
        },
        url: `${baseUrl}api/file/${path}`,
    })
}

//Настройки

export const getPatterns = () => {
    return instanceWithToken.get(`${baseUrl}api/purchases/stock/settings/items`);
}

export const getPayersList = () => {
    return instanceWithToken.get(`${baseUrl}api/purchases/stock/settings/payers`);
}

export const getCategories = () => {
    return instanceWithToken.get(`${baseUrl}api/purchases/stock/settings/categories`);
}

export const addPayer = (id, name, inn, payment_type, by_default) => {
    return instanceWithToken({
        method: 'post',
        mode: "cors",
        url: `${baseUrl}api/purchases/stock/settings/payers`,
        data: { id, name, inn, payment_type, by_default }
    })
}

export const addPayerNal = (name, payment_type, by_default) => {
    return instanceWithToken({
        method: 'post',
        mode: "cors",
        url: `${baseUrl}api/purchases/stock/settings/payers`,
        data: { name, payment_type, by_default }
    })
}

export const payerDelete = (id) => {
    return instanceWithToken({
        method: 'delete',
        mode: "cors",
        url: `${baseUrl}api/purchases/stock/settings/payers`,
        data: { id }
    })
}

export const payerActivate = (id, active) => {
    return instanceWithToken({
        method: 'patch',
        mode: "cors",
        url: `${baseUrl}api/purchases/stock/settings/payers`,
        data: { id, active }
    })
}

export const payerDefault = (id, active, by_default) => {
    return instanceWithToken({
        method: 'patch',
        mode: "cors",
        url: `${baseUrl}api/purchases/stock/settings/payers`,
        data: { id, active, by_default }
    })
}

export const addCategory = (name, by_default) => {
    return instanceWithToken({
        method: 'post',
        mode: "cors",
        url: `${baseUrl}api/purchases/stock/settings/categories`,
        data: { name, by_default }
    })
}

export const сategoryDelete = (id) => {
    return instanceWithToken({
        method: 'delete',
        mode: "cors",
        url: `${baseUrl}api/purchases/stock/settings/categories`,
        data: { id }
    })
}

export const сategoryActivate = (id, active) => {
    return instanceWithToken({
        method: 'patch',
        mode: "cors",
        url: `${baseUrl}api/purchases/stock/settings/categories`,
        data: { id, active }
    })
}

export const сategoryDefault = (id, active, by_default) => {
    return instanceWithToken({
        method: 'patch',
        mode: "cors",
        url: `${baseUrl}api/purchases/stock/settings/categories`,
        data: { id, active, by_default }
    })
}

export const addPattern = (name, unit, type, max_price, rate, active) => {
    return instanceWithToken({
        method: 'post',
        mode: "cors",
        url: `${baseUrl}api/purchases/stock/settings/items`,
        data: { name, unit, type, max_price, rate, active}
    })
}

export const editPattern = (name, unit, type, max_price, rate, active, id) => {
    return instanceWithToken({
        method: 'put',
        mode: "cors",
        url: `${baseUrl}api/purchases/stock/settings/items`,
        data: { name, unit, type, max_price, rate, active, id}
    })
}

export const patternActivate = (id, active) => {
    return instanceWithToken({
        method: 'patch',
        mode: "cors",
        url: `${baseUrl}api/purchases/stock/settings/items`,
        data: { id, active }
    })
}

export const patternDelete = (id) => {
    return instanceWithToken({
        method: 'delete',
        mode: "cors",
        url: `${baseUrl}api/purchases/stock/settings/items`,
        data: { id }
    })
}



