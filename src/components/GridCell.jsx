import {memo} from "react"
const arePropsEqual = (prevProps, nextProps) => {  
    if (prevProps.isEnd !== nextProps.isEnd) {  
      return false; 
    }  
    else if(prevProps.isStart !== nextProps.isStart){
        return false
    }else if(prevProps.isVisited !==nextProps.isVisited){
        return false
    }
    return true;   
  };

const  GridCell=memo(({isStart, isVisited, isEnd, rowIndex, columnIndex, handleClick})=>{
    console.log("cell renders");
    return( <div style={{border:'2px solid black', height:'20px', width:'20px', 
        backgroundColor:`${isStart?'green':isEnd?'red':isVisited?'blue':'white'}`
    }} onClick={()=>handleClick(rowIndex, columnIndex)} >
        
        </div>)
},arePropsEqual)


export default GridCell
