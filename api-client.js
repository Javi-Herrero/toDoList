const localApi = 'http://localhost:3000/';

const postItem = async (toDo) => {
    try {
        const response = await fetch(localApi, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(toDo),
        });
        let obj = await response.json()
        console.log(`${toDo.description} (id: ${obj._id}) was added to the list`)
        return obj;

    } catch (error) {
        console.log(error)
    }
}

const getItem = async (id) => {
    try {
        let itemRaw = await fetch(`${localApi}${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        let itemReady = await itemRaw.json();
        console.log(`gotten item id ${itemReady._id}`)
    } catch (error) {
        console.log(error)
    }

};

let dbAll;
const getAll = async () => {
    try {
        let itemRaw = await fetch(localApi, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        let itemReady = await itemRaw.json();
        dbAll = itemReady;

        return dbAll
    } catch (error) {
        console.log(error)
    }

};

const deleteItem = async (id, task) => {
    try {
        await fetch(`${localApi}${id}`, {
            method: 'DELETE',
        });

        console.log(`${task} (id: ${id}) was deleted`)
    } catch (error) {
        console.log(error)
    }
};

const eraseAll = async () => {
    try {
        await getAll();
        dbAll.forEach(element => {
            let id = element._id;
            deleteItem(id)
            console.log(`all was erased`)
        });
    } catch (error) {

    }
}
export { postItem, getItem, deleteItem, getAll, eraseAll };   