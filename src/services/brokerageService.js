const CleanUpBrokeragesAPIData = (brokeragesFromAPI) => {
    if (brokeragesFromAPI.length === 0) {
        return [];
    }
    if (brokeragesFromAPI[0].hasOwnProperty('id') && brokeragesFromAPI[0].hasOwnProperty('name')) {
        return brokeragesFromAPI;
    } 
    const cleanedBrokerages = brokeragesFromAPI.map((brokerage) => {
        return {
            id: brokerage.brokerage.id,
            name: brokerage.brokerage.name,
            roles: brokerage.roles,
        };
    });
    return cleanedBrokerages;
}

const SaveBrokeragesToLocalStorage = (brokerages) => {
    const cleanedBrokerages = CleanUpBrokeragesAPIData(brokerages);
    localStorage.setItem('brokerages', JSON.stringify(cleanedBrokerages));
    return GetBrokeragesFromLocalStorage();
}

const GetBrokeragesFromLocalStorage = () => {
    const brokerages = localStorage.getItem('brokerages');
    if (brokerages) {
        return JSON.parse(brokerages);
    }
    return [];
}

const GetBrokerageById = (brokerageId) => {
    const brokerages = GetBrokeragesFromLocalStorage();
    const brokerage = brokerages.find((brokerage) => brokerage.id === brokerageId);
    if (brokerage) {
        return brokerage;
    }
    return null;
}

const SetActiveBrokerage = (brokerageId) => {
    const brokerage = GetBrokerageById(brokerageId);
    localStorage.setItem('activeBrokerage', JSON.stringify(brokerage));
}

const GetActiveBrokerage = () => {
    const activeBrokerage = localStorage.getItem('activeBrokerage');
    if (activeBrokerage) {
        return JSON.parse(activeBrokerage);
    }
    return null;
}

// export all the functions
export {
    CleanUpBrokeragesAPIData,
    SaveBrokeragesToLocalStorage,
    GetBrokeragesFromLocalStorage,
    GetBrokerageById,
    SetActiveBrokerage,
    GetActiveBrokerage,    
}