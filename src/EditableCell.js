import { useState, useEffect } from "react";

const EditableCell = ({ value, isDisabled }) => {
    const [cellValue, setCellValue] = useState('');
    useEffect(() => {
      setCellValue(value);
    }, []);

    
    const onChange = (e) => {
        if(!isDisabled) {
            setCellValue(e.target.value)
        }
    }
    return(
        <input 
            value={cellValue} 
            disabled={isDisabled} 
            onChange={(e) => onChange(e)} 
            className={isDisabled ? 'text-area' : ''}
        />
    )
}

export default EditableCell;