const url = 'http://www.apieccomerce.somee.com';

export async function httpGet(endpoint, query?) {
    let string = url.concat(endpoint);
    if (query) string += '?' + new URLSearchParams({ busqueda: query });

    return await fetch(string, {
        method: 'GET'
    })
        .then((response) => response.json())
        .then((json) => {
            return json;
        })
        .catch((err) => {
            return err;
        });
}

export async function httpPost(endpoint, data) {
    const string = url.concat(endpoint);

    return await fetch(string, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then((response) => response.json())
        .then((json) => {
            return json;
        })
        .catch((err) => {
            return err;
        });
}

export async function httpPut(endpoint, body) {
    const string = url.concat(endpoint);

    return await fetch(string, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
        .then((response) => response.json())
        .then((json) => {
            return json;
        })
        .catch((err) => {
            return err;
        });
}

export async function httpDelete(endpoint, query) {

    let string = url.concat(endpoint);

    if (query) string = string.concat(`/${query}`);

    return await fetch(string, {
        method: 'DELETE'
    })
        .then((response) => response.json())
        .then((json) => {
            return json;
        })
        .catch((err) => {
            return err;
        });
}
