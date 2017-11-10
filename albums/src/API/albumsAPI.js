const baseUrl = "http://localhost:3001/api/";

let onSuccess = (response) => {
    return response.json();
};
let onError = (error) => {
    console.log(error);
};

function get(url) {
    return fetch(baseUrl + url).then(onSuccess, onError);
}

function create(obj, url) {
    const request = new Request(baseUrl + url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(obj)
    });
    return fetch(request).then(onSuccess, onError);
}

// function edit(obj, url){
//     const request = new Request(baseUrl + url, {
//         method: "PUT",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify(obj)
//     });
// }

function del(url) {
    const request = new Request(baseUrl + url, {
        method: "DELETE"
    });
    return fetch(request).then(onSuccess, onError);
}


// specific functions to export

export function getAlbums() {
    return get("album");
}

export function createAlbum(album) {
    return create(album, "album");
}

// export function editAlbum(album){
//     return edit(album, "album");
// }
export function deleteAlbum(id) {
    return del(`album/${id}`);
}