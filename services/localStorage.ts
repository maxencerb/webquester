import { AppRequestType, SaveRequestType } from "@models/request";
import { createRandomUid } from "./utils/uid";

const storageSpace = 'webquester-saved-requests'

const getSavedRequests = (): Array<SaveRequestType> => {
    const savedRequests = localStorage.getItem(storageSpace);
    if (savedRequests) {
        console.log(JSON.parse(savedRequests));
        return JSON.parse(savedRequests);
    }
    return [];
}

const saveRequest = (request: AppRequestType, title: string): boolean => {
    const savedRequests = getSavedRequests();
    savedRequests.push({
        request,
        title,
        uid: createRandomUid()
    });
    try {
        localStorage.setItem(storageSpace, JSON.stringify(savedRequests));
    } catch (e) {
        console.error(e);
        return false;
    } 
    return true;
}

const deleteRequest = (index: number): boolean => {
    const savedRequests = getSavedRequests();
    savedRequests.splice(index, 1);
    try {
        localStorage.setItem(storageSpace, JSON.stringify(savedRequests));
    } catch (e) {
        console.error(e);
        return false;
    }
    return true;
}

export {
    getSavedRequests,
    saveRequest,
    deleteRequest
}