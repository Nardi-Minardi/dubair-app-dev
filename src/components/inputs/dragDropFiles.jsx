import React, { useState, useEffect, useRef } from 'react'
import { useTheme } from 'next-themes'

const DragDropFiles = ({ title, desc }) => {
  const inputRef = useRef(null)
  const { theme, setTheme } = useTheme()
  const [dragActive, setDragActive] = useState(false);
  const [mounted, setMounted] = React.useState(false)
  const [files, setFiles] = useState([])

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    console.log(files)
  }, [files])

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      for (let i = 0; i < e.dataTransfer.files["length"]; i++) {
        setFiles((prevState) => [...prevState, e.dataTransfer.files[i]]);
      }
    }
  }

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  }

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  }

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  }

  const removeFile = (fileName, idx) => {
    const newArr = [...files];
    newArr.splice(idx, 1);
    setFiles([]);
    setFiles(newArr);
  }

  const openFileExplorer = (e) => {
    inputRef.current.value = "";
    inputRef.current.click();
  }


  const onChangeFile = (e) => {
    e.preventDefault();
    console.log("File has been added");
    if (e.target.files && e.target.files[0]) {
      console.log(e.target.files);
      for (let i = 0; i < e.target.files["length"]; i++) {
        setFiles((prevState) => [...prevState, e.target.files[i]]);
      }
    }
  }

  // send files to the server // learn from my other video
  const handleUpload = () => {
    if (files.length === 0) {
      // no file has been submitted
    } else {
      const formData = new FormData();
      formData.append("Files", files);
      console.log(formData.getAll())
      // fetch(
      //   "link", {
      //     method: "POST",
      //     body: formData
      //   }  
      // )
    }

  };

  return (
    <>
      <div className="relative h-auto flex flex-col py-12 w-full border-2 border-dashed border-[#4A5FEF] rounded-md justify-center items-center text-center">
        <div className="flex flex-col">
          <div
            className={`${dragActive ? "bg-blue-100 border-blue-300" :
             "bg-[#F9FAFB] dark:bg-[#1F2937] dark:border-[#4A5FEF] border-1"
              }  h-32 p-16 flex flex-col  justify-center items-center cursor-pointer shadow-sm`}
            onDragEnter={handleDragEnter}
            onSubmit={(e) => e.preventDefault()}
            onDrop={handleDrop}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onClick={() => inputRef.current.click()}
          >
            <img src={`/assets/icons/upload-icon-${theme === 'dark' ? 'dark' : 'light'}.svg`}
              alt="upload" className="w-10 h-10 m-auto" />
            <label className="text-lg">{title}</label>
          </div>

          <input
            type="file"
            id="file"
            multiple
            hidden
            ref={inputRef}
            onChange={onChangeFile}
          />

          <div className='flex flex-col mb-8'>
            <div className='flex flex-row items-center justify-center gap-8 lg:gap-20 xl:gap-20 mt-5'>
              <a href="#" onClick={() => inputRef.current.click()}>
                <img src={`/assets/icons/upload-folder-${theme === 'dark' ? 'dark' : 'light'}.svg`}
                alt="upload" className="w-6 h-6 " />
              </a>
              <a href="https://www.google.com/intl/in/drive/about.html">
                <img src={`/assets/icons/upload-drive.svg`} alt="upload" className="w-6 h-6 " />
              </a>
              <a href="https://www.dropbox.com/">
                <img src={`/assets/icons/upload-box.svg`} alt="upload" className="w-6 h-6 " />
              </a>
              <a href="#">
                <img src={`/assets/icons/upload-link-${theme === 'dark' ? 'dark' : 'light'}.svg`}
                alt="upload" className="w-6 h-6 " />
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <label className="text-sm text-gray-400">{desc}</label>
          <ul className="flex flex-row gap-4 flex-wrap px-2 lg:px-12 xl:px-12">
            {files.length > 0 && files.map((file, index) => (
              <li key={index}>
                {file.name}
                <span className="
                border border-red-500 rounded-full py-0 px-2 text-md bg-red-500 text-white
                cursor-pointer ml-2"
                onClick={() => removeFile(file.name, index)}>
                  x
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
    </>
  )
}

export default DragDropFiles