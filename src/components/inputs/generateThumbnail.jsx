import { useEffect, useRef, useState } from "react";
import {
  generateVideoThumbnails,
  importFileandPreview
} from "@rajesh896/video-thumbnails-generator";
import videojs from 'video.js';
import Player from "../videoPlayer/videojs/player";
import { get_filesize } from "@/utils/videoHook";
import { acumulatedDuration } from "@/utils/videoHook";

const GenerateThumbnail = ({ file, fileFromLink, typeFromLink, clearFiles, onClose, noFileSelected, setSpeakerValue, setLanguage, autoDetectSpeaker, autoDetectLanguage, duration, setDuration }) => {
 
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const [fileSize, setFileSize] = useState(0);
  const [prefixSize, setPrefixSize] = useState('');

  useEffect(() => {
    if (fileFromLink) {
      get_filesize(fileFromLink, function (size) {
        let fileSize = isNaN(size) ? 0 : Number(size);
        if (fileSize < 1024) {
          setPrefixSize(`${fileSize} B`);
        } else if (fileSize < 1024 * 1024) {
          setPrefixSize(`${(fileSize / 1024).toFixed(2)} KB`);
        } else if (fileSize < 1024 * 1024 * 1024) {
          setPrefixSize(`${(fileSize / (1024 * 1024)).toFixed(2)} MB`);
        } else {
          setPrefixSize(`${(fileSize / (1024 * 1024 * 1024)).toFixed(2)} GB`);
        }
      });
    } else {
      if (file.size < 1024) {
        setPrefixSize(`${file.size} B`);
      } else if (file.size < 1024 * 1024) {
        setPrefixSize(`${(file.size / 1024).toFixed(2)} KB`);
      } else if (file.size < 1024 * 1024 * 1024) {
        setPrefixSize(`${(file.size / (1024 * 1024)).toFixed(2)} MB`);
      } else {
        setPrefixSize(`${(file.size / (1024 * 1024 * 1024)).toFixed(2)} GB`);
      }
    }
  }, [file, fileFromLink])

  const videoJsOptions = {
    autoplay: false,
    controls: true,
    responsive: true,
    fluid: true,
    techOrder: ['html5', 'youtube'],
    sources: [{
      src: fileFromLink ? fileFromLink : URL.createObjectURL(file),
      type: typeFromLink ? `video/${typeFromLink}` : `video/${file.type.split('/')[1]}`
    }]
  };

  const handlePlayerReady = (player) => {
    playerRef.current = player;

    // You can handle player events here, for example:
    player.on('waiting', () => {
      videojs.log('player is waiting');
    });

    player.on('dispose', () => {
      videojs.log('player will dispose');
    });
  };


  return (
    <>
      <div
        style={{
          display: "flex",
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {noFileSelected === true || !file ? (
          <p className="text-sm text-gray-400 dark:text-white">No file selected</p>
        ) : (
          <div className="flex flex-row items-center gap-2">
            {/* <div ref={(el) => (videoRef.current = el)}
              className="video-js vjs-default-skin vjs-big-play-centered"
              style={{ width: 250, height: 'auto' }}>
            </div> */}
            <Player
              fileFromLink={fileFromLink}
              file={file}
              autoDetectSpeaker={autoDetectSpeaker}
              autoDetectLanguage={autoDetectLanguage}
              setDuration={setDuration}
              setSpeakerValue={setSpeakerValue}
              setLanguage={setLanguage}
              width={250}
              height={'auto'}
              options={videoJsOptions}
              onReady={handlePlayerReady} />

            <div className="flex flex-col gap-2">
              <span className="text-sm text-gray-400 dark:text-white">{file.name ? file.name : 'Title not dectected'}</span>
              <span className="text-sm text-gray-400 dark:text-white">{prefixSize}</span>
              <span className="text-sm text-gray-400 dark:text-white">{acumulatedDuration(duration)}</span>
            </div>
          </div>
        )}

        <button
          className="bg-[#EEEEEE] dark:bg-[#2B2C2B] rounded-md items-center py-1 justify-center flex w-auto px-5"
          onClick={() => {
            clearFiles();
          }}
        >
          Remove
        </button>
      </div>
    </>
  );
}

export default GenerateThumbnail;