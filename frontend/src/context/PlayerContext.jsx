import { createContext, useEffect, useRef, useState } from "react";
import { songsData } from "../assets/frontend-assets/assets";

export const PlayerContext=createContext();

const PlayerContextProvider = (props)=>{

    const audioRef=useRef();
    const seekBg=useRef();
    const seekBar=useRef();

    //default track will be first song whenever project is loaded
    const [track,setTrack]=useState(songsData[0]);

    //whenever the project is loaded the state will be falsed so it get paused
    const [PlayStatus,setPlayStatus]=useState(false);

    //to get total duration and current time
    const[time,setTime]=useState({
        currentTime:{
          second:0,
          minute:0
        },
        totalTime:{
           second:0,
           minute:0
        }
    });

       const play=()=>{
          audioRef.current.play();
          setPlayStatus(true);
       }

       const pause=()=>{
        audioRef.current.pause();
        setPlayStatus(false);
       }

       const playWithId= async (id) => {
         await setTrack(songsData[id]);
         await audioRef.current.play();
         setPlayStatus(true); 
       }

        const previous = async ()=>{
            if(track.id>0){
              await setTrack(songsData[track.id-1]);
              await audioRef.current.play();
              setPlayStatus(true);
            }
        }

        const next = async ()=>{
            if(track.id < songsData.length-1){
              await setTrack(songsData[track.id+1]);
              await audioRef.current.play();
              setPlayStatus(true);
            }
        }

        const seekSong = async (e) => {
          audioRef.current.currentTime = ((e.nativeEvent.offsetX / seekBg.current.offsetWidth)*audioRef.current.duration);
        }

       useEffect(()=>{
        setTimeout(()=>{
            audioRef.current.ontimeupdate=()=>{
                //for gtting green line on bar with respect to time
              seekBar.current.style.width = (Math.floor(audioRef.current.currentTime/audioRef.current.duration*100)) + "%";
              
              setTime({
                    currentTime:{
                      second:Math.floor(audioRef.current.currentTime % 60),
                      minute:Math.floor(audioRef.current.currentTime / 60)
                    },
                    totalTime:{
                       second:Math.floor(audioRef.current.duration % 60),
                       minute:Math.floor(audioRef.current.duration / 60),
                    }
                })
              }
        },1000) ;
        },[audioRef])

    const contextValue={
        audioRef,
        seekBg,
        seekBar,
        track,setTrack,
        PlayStatus,setPlayStatus,
        time,setTime,
        play,pause,
        playWithId,
        previous,next,
        seekSong
    }

    return(
        <PlayerContext.Provider value={contextValue}>
            {props.children}
        </PlayerContext.Provider>
    )
}

export default PlayerContextProvider;