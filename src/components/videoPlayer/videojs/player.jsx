import { duration } from "moment";
import React, { useEffect, useRef, useState } from "react";
import videojs from 'video.js';

const Player = ({
  file,
  options,
  onReady,
  height,
  width,
  autoDetectSpeaker,
  autoDetectLanguage,
  setDuration,
  duration,
  setSpeakerValue,
  setLanguage,
  fileFromLink
}) => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    if (!playerRef.current) {

      const videoElement = document.createElement("video-js");

      // videoElement.classList.add('vjs-big-play-centered');
      videoRef.current.appendChild(videoElement);

      const player = playerRef.current = videojs(videoElement, options, () => {
        onReady && onReady(player);
      });
    } else {
      const player = playerRef.current;

      player.autoplay(options.autoplay);
      player.src(options.sources);
    }

    if (file) {
      getVideoDurationFromVideoFile(file).then((res) => {
        // console.log('res duration', res)
        setDuration(res);
      });
    }
    if (autoDetectSpeaker) {
      getAudioSpeaker().then((res) => {
        // console.log('res speaker', res)
        setSpeakerValue(res);
      });
    }
    if (autoDetectLanguage) {
      getLangVideo().then((res) => {
        // console.log('res lang', res)
        setLanguage(res);
      });
    }

  }, [options, videoRef, duration]);

  // Dispose the Video.js player when the functional component unmounts
  useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  const getAudioSpeaker = () => {
    return new Promise((resolve, reject) => {
      let audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const numberOfSpeakers = audioCtx.destination.numberOfInputs;
      resolve(numberOfSpeakers);
    });
  }

  const getLangVideo = () => {
    return new Promise((resolve, reject) => {
      const videoElement = playerRef.current;
      const lang = videoElement.options_.language;
      resolve(lang);
    });
  }

  const generateVideoDurationFromUrl = (url) => {
    return new Promise((resolve, reject) => {
      const video = playerRef.current;
      video.on('loadedmetadata', function () {
        resolve(video.duration());
      });
    })
  }

  const getVideoDurationFromVideoFile = (videoFile) => {
    return new Promise((resolve, reject) => {
      try {
        if (videoFile) {
          const url = fileFromLink ? fileFromLink : URL?.createObjectURL(videoFile);
          generateVideoDurationFromUrl(url).then((res) => {
            resolve(res)
          })
        } else {
          reject("Cannot generate video duration for this video file.");
        }
      } catch (error) {
        reject(error);
      }
    });
  };

  return (
    <div data-vjs-player>
      <div
        style={{ width: width, height: height }}
        ref={videoRef} />
    </div>
  )
}

export default Player