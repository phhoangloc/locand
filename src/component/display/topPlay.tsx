'use client'
import React, { useEffect, useState } from 'react'
import { useRef } from 'react'
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import { color } from '@/style/theme';
type Props = {
    song: string
}

const TopPlay = ({ song }: Props) => {

    const videoPlayer: any = useRef("")
    const audioPlayer: any = useRef("")

    const [onPlay, setOnPlay] = useState<boolean>(false)
    const [timeDuration, setTimeDuration] = useState<number>(0)

    const play = () => {
        setOnPlay(true)
        audioPlayer.current && audioPlayer.current.play()
        videoPlayer.current && videoPlayer.current.play()
    }
    const pause = () => {
        setOnPlay(false)
        audioPlayer.current && audioPlayer.current.pause()
        videoPlayer.current && videoPlayer.current.pause()
    }
    const end = () => {
        videoPlayer.current && videoPlayer.current.pause()
        setOnPlay(false)
    }
    const timeUpdate = () => {
        const duration = audioPlayer.current.duration;
        const currentTime = audioPlayer.current.currentTime;
        const durationPercent = currentTime / duration
        setTimeDuration(durationPercent * 100)

    }
    return (
        <div style={{ width: "100%", maxWidth: "575px", margin: "auto", height: "max-content", }}>
            <video style={{ width: "100%", borderRadius: "5px" }} ref={videoPlayer} src='/video/video_001.mp4' playsInline onEnded={(e) => { e.currentTarget.play() }} />
            <audio ref={audioPlayer} src={song} onEnded={() => end()} onTimeUpdate={() => timeUpdate()} autoPlay playsInline />
            <div style={{ position: "relative", height: "5px" }}>
                <div style={{ position: "absolute", height: "100%", background: color.main, width: timeDuration + "%" }}></div>
                <div style={{ position: "absolute", width: "10px", height: "10px", borderRadius: "50%", background: "white", top: "-2.5px", left: `calc(-2.5px + ${timeDuration}%)`, border: `1px solid ${color.main}`, }}></div>
            </div>
            <div style={{ textAlign: "center" }}>
                {!onPlay ?
                    <PlayArrowIcon style={{ width: "50px", height: "50px", cursor: "pointer" }} onClick={() => play()} /> :
                    <PauseIcon style={{ width: "50px", height: "50px", cursor: "pointer" }} onClick={() => pause()} />}</div>
        </div>
    )
}

export default TopPlay