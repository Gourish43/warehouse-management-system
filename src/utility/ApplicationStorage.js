const ApplicationStore = () => {
  
    function setStorage(storageKey, storageData) {
      sessionStorage.setItem(storageKey, JSON.stringify(storageData));
    }
  
    function getStorage(storageKey) {
      const dataObject = sessionStorage.getItem(storageKey) ? JSON.parse(sessionStorage.getItem(storageKey)) : '';
      return dataObject;
    }
  
    function clearStorage() {
      sessionStorage.clear();
    }
  
    return {
      setStorage,
      getStorage,
      clearStorage,
    };
  };
  
  export default ApplicationStore;