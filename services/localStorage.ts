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
        uid: createRandomUid(),
        timestamp: Date.now()
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

const deleteAllRequests = (): boolean => {
    try {
        localStorage.removeItem(storageSpace);
    } catch (e) {
        console.error(e);
        return false;
    }
    return true;
}

const downloadSavedRequests = () => {
    const savedRequests = getSavedRequests();
    const json = JSON.stringify(savedRequests, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'saved-requests.json';
    a.click();
    window && window.URL.revokeObjectURL(url);
}

const importRequests = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
        const data = JSON.parse(e.target?.result as string) as Array<SaveRequestType>;
        const savedRequests = getSavedRequests();
        data.forEach(request => {
            const index = savedRequests.findIndex(r => r.uid === request.uid);
            if (index === -1) {
                savedRequests.push(request);
            } else {
                savedRequests[index] = request;
            }
        });
        try {
            localStorage.setItem(storageSpace, JSON.stringify(savedRequests));
        } catch (e) {
            console.error(e);
        }
    }
    reader.readAsText(file);
}

export {
    getSavedRequests,
    saveRequest,
    deleteRequest,
    deleteAllRequests,
    downloadSavedRequests,
    importRequests
}