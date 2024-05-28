import { useEffect, useRef, useState } from "react";
import {
  generateVideoThumbnails,
  importFileandPreview
} from "@rajesh896/video-thumbnails-generator";

const GenerateThumbnail = ({ file, clearFiles, onClose, noFileSelected }) => {
  console.log('noFileSelected', noFileSelected)
  const [video, setVideo] = useState("");
  const [thumbNumber, setThumbNumber] = useState(0);
  const [videoUrl, setVideoUrl] = useState("");
  const [videoThumb, setVideoThumb] = useState("");
  const [thumbnails, setThumbnails] = useState([]);
  const [duration, setDuration] = useState(0);
  const refs = useRef({
    video: null,
    loader: null,
    numberInput: null,
    thumbButton: null
  });

  useEffect(() => {
    if (file) {
      setVideo(file);
      importFileandPreview(file).then((res) => {
        setVideoUrl(res);
      });
      setVideoThumb("");
      setThumbnails([]);
      if (refs.current.video) {
        refs.current.video.style.transform = "scale(1)";
      }

      if (refs.current.numberInput) {
        refs.current.numberInput.style.display = "block";
      }
      if (refs.current.thumbButton) {
        refs.current.thumbButton.style.display = "block";
      }
    }
    getVideoDurationFromVideoFile(file).then((res) => {
      setDuration(res);
    });
    generateVideoThumbnails(file).then((thumbs) => {
      setThumbnails(thumbs);
    });
  }, [video, file]);

  const acumulatedSize = (size) => {
    if (size < 1024) {
      return `${size} B`;
    } else if (size < 1024 * 1024) {
      return `${(size / 1024).toFixed(2)} KB`;
    } else if (size < 1024 * 1024 * 1024) {
      return `${(size / (1024 * 1024)).toFixed(2)} MB`;
    } else {
      return `${(size / (1024 * 1024 * 1024)).toFixed(2)} GB`;
    }
  }

  const acumulatedDuration = (duration) => {
    let hours = Math.floor(duration / 3600);
    let minutes = Math.floor((duration % 3600) / 60);
    let seconds = Math.floor(duration % 60);
    return `${hours}:${minutes}:${seconds}`;
  }

  // generate the video duration either via url
  const generateVideoDurationFromUrl = (url) => {
    return new Promise((resolve, reject) => {
      let video = document.createElement("video");
      video.addEventListener("loadeddata", function () {
        resolve(video.duration);
        window.URL.revokeObjectURL(url);
      });
      video.preload = "metadata";
      video.src = url;
      // Load video in Safari / IE11
      video.muted = true;
      video.crossOrigin = "Anonymous";
      video.playsInline = true;
      video.play();
    })
  }

  const getVideoDurationFromVideoFile = (videoFile) => {
    return new Promise((resolve, reject) => {
      try {
        if (videoFile) {
          if ((videoFile)?.type?.match("video/*")) {
            importFileandPreview(videoFile).then((url) => {
              generateVideoDurationFromUrl(url).then((res) => {
                resolve(res);
              })
            });
          } else {
            generateVideoDurationFromUrl(videoFile).then((res) => {
              resolve(res)
            })
          }
        } else {
          reject("Cannot generate video duration for this video file.");
        }
      } catch (error) {
        reject(error);
      }
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
          <p className="text-sm text-gray-400 dark:text-white">No file awdselected</p>
        ) : (
          <div className="flex flex-row items-center gap-2">
            <video
              poster={videoThumb}
              style={{
                maxWidth: 250,
                maxHeight: 500,
                transform: "scale(0)",
                transition: "all 0.3s",
                width: "100%",
                borderRadius: 5
              }}
              controls
              id="video"
              ref={(el) => (refs.current.video = el)}
              src={videoUrl}
            >
              <source src={videoUrl} type={video?.type} />
              Your browser does not support the video tag.
            </video>


            {/* {thumbnails.map((item) => {
            return (
              <img
                src={item}
                style={{ width: 200, margin: 10, cursor: "pointer" }}
                alt=""
              // onClick={() => {
              //   setVideoThumb(item);
              //   window.scrollTo({ top: 0, behavior: "smooth" });
              // }}
              />
            );
          })} */}
            <div className="flex flex-col gap-2">
              <span className="text-sm text-gray-400 dark:text-white">{file.name}</span>
              <span className="text-sm text-gray-400 dark:text-white">{acumulatedSize(file.size)}</span>
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
        {/* <div style={{ display: "flex", marginTop: 25 }}>
          <input
            type="file"
            id="inputfile"
            accept="video/*"
            onChange={(e) => {
              if (e.target.files?.length > 0) {
                setVideo(e.target.files[0]);
              }
            }}
          />
          <div
            id="numberWrapper"
            style={{ display: "none" }}
            ref={(el) => (refs.current.numberInput = el)}
          >
            <label for="numberofthumbnails" style={{ marginLeft: 15 }}>
              Enter number of thumbnails to generate
            </label>
            <input
              type="number"
              id="numberofthumbnails"
              onChange={(e) => {
                setThumbNumber(parseInt(e.target.value, 0));
              }}
            />
          </div>
        </div>
        <div
          style={{ marginTop: 25, display: "none" }}
          id="buttonWrapper"
          ref={(el) => (refs.current.thumbButton = el)}
        >
          <button
            id="generatethumbnails"
            onClick={() => {
              if (video) {
                // if (refs.current.loader) {
                //   refs.current.loader.style.display = "block";
                // }
                generateVideoThumbnails(video, thumbNumber).then((thumbs) => {
                  setThumbnails(thumbs);
                  // if (refs.current.loader) {
                  //   refs.current.loader.style.display = "none";
                  // }
                });
              }
            }}
          >
            Generate Thumbnails
          </button>
        </div> */}
      </div>
      {/* <div
        id="loader"
        style={{ display: "none", textAlign: "center" }}
        ref={(el) => (refs.current.loader = el)}
      >
        <img
          src="https://i.giphy.com/media/l3nWhI38IWDofyDrW/giphy.webp"
          alt=""
        />
      </div> */}
      {/* <div
        id="thumbnails"
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          alignItems: "center",
          transition: "all 0.3s"
        }}
      >
        {thumbnails.map((item) => {
          return (
            <img
              src={item}
              style={{ width: 200, margin: 10, cursor: "pointer" }}
              alt=""
              onClick={() => {
                setVideoThumb(item);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            />
          );
        })}
      </div> */}

      {/* <div
        class="note"
        style={{
          position: "fixed",
          bottom: 0,
          right: 0,
          fontWeight: "bold",
          color: "black",
          background: "whitesmoke",
          border: "1px solid black",
          borderRadius: 5,
          padding: 5
        }}
      >
        <ul>
          <li>Not ready for production.</li>
          <li>
            Play with numbers sometimes promises behave badly [in-progress]
          </li>
          <li>
            You have to reload the page everytime you want to select the video
            [badly coded html/js]
          </li>
        </ul>
      </div> */}
    </>
  );
}

export default GenerateThumbnail;