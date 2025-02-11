import { useEffect, useState } from "react";

export default function Grid(){
    const gridBox = Array(20).fill(null).map(()=>Array(20).fill(0));
    const[start, setStart]= useState(null);
    const[end, setEnd]= useState(null);
    const[visited, setVisited]= useState(new Set());
     
    const dist =[[0,1],[1,0],[0,-1],[-1,0]];

    const dfs = (rowIndex, columnIndex, visited)=>{
              if(!end || rowIndex<0 || columnIndex <0 || rowIndex>=20 || columnIndex>=20) return false
              if(visited.has(`${rowIndex}-${columnIndex}`)) return false
              if(end[0]==rowIndex && end[1]==columnIndex) return true
             
              visited.add(`${rowIndex}-${columnIndex}`);

              for(const [dx,dy] of dist){
                if(dfs(rowIndex+dx, columnIndex+dy,visited)) return true;
              }

              return false;


    }

    const handleClick = (rowIndex, columnIndex)=>{
                if(!start) setStart([rowIndex, columnIndex])
                else if(!end) setEnd([rowIndex,columnIndex])
              
    }
    useEffect(()=>{
        if(start&& end){
            const newSet = new Set();
            dfs(start[0], start[1],newSet);
            setVisited(newSet);
        }

    },[start,end])
    return(
        <>
        <div style={{display:'grid', gridTemplateColumns:`repeat(20, 40px)`,gap:'4px'}}>
              {gridBox.map((row, rowIndex)=>
              row.map((_,columnIndex)=>{
                const isStart = start && start[0]==rowIndex && start[1]==columnIndex
                const isEnd = end && end[0]==rowIndex && end[1]==columnIndex
                const isVisited =visited.has(`${rowIndex}-${columnIndex}`)
                return(
                    <div style={{border:'2px solid black', height:'20px', width:'20px', 
                        backgroundColor:`${isStart?'green':isEnd?'red':isVisited?'blue':'white'}`
                    }} onClick={()=>handleClick(rowIndex, columnIndex)} key={`${rowIndex}-${columnIndex}`}>
                        
                        </div>
                )
              })
            )}
                  
              <div onClick={()=>{setStart(null), setEnd(null), setVisited(new Set())}} style={{width:"100px", border:'2px solid black', padding:"10px", borderRadius:"8px", backgroundColor:"lightgray", textAlign:"center", cursor:"pointer"}}>Reset</div>
        </div>
        </>
    )
}