import { useState } from 'react';

const useSubForm =(callback)=> {
    const [subValues, setSubValues]=useState({});

    const handleSubChange =(event)=> {
        event.persist();
        setSubValues({...subValues,[event.target.name] : event.target.value});

    }
    const handleSubSubmit =(event)=> {
        event.preventDefault();
        callback();
    };
    return {subValues, handleSubChange, handleSubSubmit}
};

export default useSubForm;
