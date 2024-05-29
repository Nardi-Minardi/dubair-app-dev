import { AiFillCaretRight, AiOutlinePause } from "react-icons/ai";
import { TimelineState } from "@xzdarcy/react-timeline-editor";
import React, { FC, useEffect, useState } from "react";
import lottieControl from "./lottieControl";
import { scale, scaleWidth, startLeft } from "./mock";
import {
  HiOutlineVolumeUp,
  HiOutlineVolumeOff,
  HiOutlineZoomOut,
  HiOutlineZoomIn,
} from "react-icons/hi";

export const Rates = [0.2, 0.5, 1.0, 1.5, 2.0];

export const VolumeControl: FC<{
  volume: number;
  onVolumeChange: (volume: number) => void;
}> = ({ volume, onVolumeChange }) => {
  console.log(volume);
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
          justifyContent: "space-between",
        }}
        onClick={() => {
          onVolumeChange(volume === 0 ? 1 : 0);
        }}>
        {/* {volume === 0 ? 
        : 
        } */}
        <HiOutlineVolumeOff />
        <input
          style={{ cursor: "pointer" }}
          type='range'
          min={0}
          className='my-input-range'
          max={1}
          step={0.01}
          value={volume}
          onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
        />
        <HiOutlineVolumeUp />
      </div>
    </div>
  );
};

export const ZoomControl: FC<{
  scale: number;
  onZoomChange: (scale: number) => void;
}> = ({ scale, onZoomChange }) => {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
          justifyContent: "space-between",
        }}
        onClick={() => {
          onZoomChange(scale / 2);
        }}>
        <HiOutlineZoomOut />
      </div>
      <input
        style={{ cursor: "pointer" }}
        type='range'
        min={0.5}
        className='my-input-range'
        max={2}
        step={0.1}
        value={scale}
        onChange={(e) => onZoomChange(parseFloat(e.target.value))}
      />

      <HiOutlineZoomIn />
    </div>
  );
};

const TimelinePlayer: FC<{
  timelineState: React.MutableRefObject<TimelineState>;
  autoScrollWhenPlay: React.MutableRefObject<boolean>;
}> = ({ timelineState, autoScrollWhenPlay }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [time, setTime] = useState(0);

  useEffect(() => {
    if (!timelineState.current) return;
    const engine = timelineState.current;
    engine.listener.on("play", () => setIsPlaying(true));
    engine.listener.on("paused", () => setIsPlaying(false));
    engine.listener.on("afterSetTime", ({ time }) => setTime(time));
    engine.listener.on("setTimeByTick", ({ time }) => {
      setTime(time);

      if (autoScrollWhenPlay.current) {
        const autoScrollFrom = 500;
        const left = time * (scaleWidth / scale) + startLeft - autoScrollFrom;
        timelineState.current.setScrollLeft(left);
      }
    });

    return () => {
      if (!engine) return;
      engine.pause();
      engine.listener.offAll();
      lottieControl.destroy();
    };
  }, []);

  const handlePlayOrPause = () => {
    if (!timelineState.current) return;
    if (timelineState.current.isPlaying) {
      timelineState.current.pause();
    } else {
      timelineState.current.play({ autoEnd: true });
    }
  };

  const handleRateChange = (rate: number) => {
    if (!timelineState.current) return;
    timelineState.current.setPlayRate(rate);
  };

  const timeRender = (time: number) => {
    const float = (parseInt((time % 1) * 100 + "") + "").padStart(2, "0");
    const min = (parseInt(time / 60 + "") + "").padStart(2, "0");
    const second = (parseInt((time % 60) + "") + "").padStart(2, "0");
    return <>{`${min}:${second}.${float.replace("0.", "")}`}</>;
  };

  return (
    <div className='timeline-player bg-white dark:bg-[#2B2C2B] 
    dark:border-b-[#2B2C2B] border-b-[#e2e8f0]
    px-3 w-full flex flex-row items-center justify-between pb-1'>
      {/* volume */}
      <VolumeControl
        volume={lottieControl.volume}
        onVolumeChange={(volume) => {}}
      />
      {/* play */}
      <div className='flex flex-row gap-2 items-center'>
        <div
          className='play-control bg-[#eeeeee] dark:bg-[#121212] p-1 rounded-full cursor-pointer'
          onClick={handlePlayOrPause}>
          {isPlaying ? 
          <AiOutlinePause
          className=' rounded-sm text-[#333333] dark:text-[#eeeeee] dark:bg-[#121212]'/> : 
          <AiFillCaretRight className=' rounded-sm text-[#333333] dark:text-[#eeeeee] dark:bg-[#121212]'/>}
        </div>
        <div className='time'>{timeRender(time)}</div>
      </div>

      {/* zoom */}
      <div className='rate-control'>
        <ZoomControl scale={scale} onZoomChange={(scale) => {}} />
        {/* <select
          defaultValue={1}
          onChange={(e) => handleRateChange(parseFloat(e.target.value))}>
          {Rates.map((rate) => (
            <option key={rate} value={rate}>{`${rate.toFixed(1)}speed`}</option>
          ))}
        </select> */}
      </div>
    </div>
  );
};

export default TimelinePlayer;
