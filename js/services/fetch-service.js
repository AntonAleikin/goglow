export default async function fetchService(header, myBody) {

    if (myBody === undefined) {

        return fetch(header)
        .then(respose => respose.json());

    } else {

        return fetch(header, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(myBody),
        });
    }
}