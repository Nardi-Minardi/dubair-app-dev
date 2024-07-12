import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ItemListDubbingVideo from './itemListDubbingVideo'
import ItemDetailDubbingVideo from './itemDetailDubbingVideo'
import { Select, Tooltip, SelectItem } from "@nextui-org/react";
import { useTheme } from 'next-themes'
import { useTranslations } from 'next-intl';

const ListDubbingVideo = ({ getVideo }) => {
  const dispatch = useDispatch()
  const t = useTranslations('Dubbing');
  const { videos, loading } = useSelector((state) => state.video);
  const [filteredData, setFilteredData] = useState([])
  const [isWatched, setIsWatched] = useState(false)
  const [layout, setLayout] = useState('list')
  const [subtype, setSubtype] = useState('Last Modified')
  const [selectedRange, setSelectedRange] = useState("1-10");
  const { theme, setTheme } = useTheme();
  const [loadingRefresh, setLoadingRefresh] = useState(false)

  useEffect(() => {
    videos && setFilteredData(videos?.slice(0, 10))


    // get_filesize("https://vjs.zencdn.net/v/oceans.mp4", function (size) {
    //   alert("The size of foo.exe is: " + size + " bytes.");
    // });
  }, [videos])

  function get_filesize(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("HEAD", url, true); // Notice "HEAD" instead of "GET",
    //  to get only the header
    xhr.onreadystatechange = function () {
      if (this.readyState == this.DONE) {
        callback(parseInt(xhr.getResponseHeader("Content-Length")));
      }
    };
    xhr.send();
  }

  const totalData = videos?.length || 0;

  const suboptions = ['Last Modified', 'Last Created', 'Last Watched']

  const rangePaginationOptions = [];
  if (totalData <= 10) {
    rangePaginationOptions.push({ label: `1-${totalData}`, value: `1-${totalData}` });
  } else {
    for (let i = 0; i < totalData; i += 10) {
      const start = i + 1;
      const end = Math.min(i + 10, totalData);
      const label = `${start}-${end}`;
      rangePaginationOptions.push({ label, value: `${start}-${end}` });
    }
  }


  const handleSubDub = (e) => {
    setSubtype(e.target.value)
  }

  const handleRefresh = () => {
    setLoadingRefresh(true)
    getVideo()
    setLoadingRefresh(false)
    setSelectedRange("1-10")
    setFilteredData(videos.slice(0, 10))
  }

  const handlePagination = (e) => {
    setSelectedRange(e.target.value)
    const [start, end] = e.target.value.split("-").map((x) => parseInt(x));
    setFilteredData(videos.slice(start - 1, end));
  }

  return (
    <>
      <div className="flex items-center justify-between mb-5">
        <div className='flex flex-row'>
          <h1 className="w-1/2 text-2xl font-semibold]">
            {t('langRecentUpload')}
          </h1>
          <Tooltip content="Refresh">
            <button
              onClick={handleRefresh}
              className="ml-5 border-none outline-none cursor-pointer">
              <svg xmlns="http://www.w3.org/1000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"
                className={`w-[22px] h-[22px] ${loadingRefresh || loading ? "animate-spin" : ""}`}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
              </svg>
            </button>
          </Tooltip>
        </div>
        <div className="w-ful px-2 items-end flex flex-col md:flex-row lg:flex-row xl:flex-row lg:items-center md:items-center xl:items-center justify-end gap-3">
          <div className="flex items-center gap-2">
            {totalData > 10 && (
              <div className="w-[100px]">
                <Select
                  label=""
                  aria-label="Pagination"
                  placeholder={`Paginations`}
                  labelPlacement="outside"
                  selectedKeys={[selectedRange.toString()]}
                  classNames={{
                    listbox: "m-0 p-0",
                    base: "!m-0 !p-0 ",
                    mainWrapper: "p-0 m-0 !h-[34px]",
                    trigger: "m-0 !bg-white !min-h-[34px] !max-w-[170px] pr-0 !text-sm !text-black  dark:!bg-[#2B2C2B] dark:!text-white !border-[#DFDFDF] !border !rounded-md",
                    value: "m-0 !p-0 !text-sm !text-black dark:!text-white",
                  }}
                  radius="sm"
                  onChange={handlePagination}
                  disallowEmptySelection={true}
                >
                  {rangePaginationOptions?.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </Select>
              </div>
            )}
            <div className="flex items-center h-[34px] gap-2 bg-gray-100 dark:!bg-[#2B2C2B] dark:border dark:border-[#DFDFDF] p-1 rounded-md">
              <span className="cursor-pointer"
                onClick={() => setLayout('list')}>
                <img src={`/assets/icons/layout-dubbing-list-icon-${theme === 'dark' ? 'dark' : 'light'}.svg`} alt="list layout"
                  className={`w-6 h-6 border-2 rounded-md ${layout === 'list' ? 'my-border' : 'border-transparent'}`}
                />
              </span>
              <span className="cursor-pointer" onClick={() => setLayout('detail')}>
                <img src="/assets/icons/layout-dubbing-detail-icon-light.svg" alt="detail layout"
                  className={`w-6 h-6 border-2 rounded-md ${layout === 'detail' ? 'my-border' : 'border-transparent'}`}
                />
              </span>
            </div>
          </div>

          <div className="w-[170px]">
            <Select
              label=""
              aria-label="Switch"
              placeholder={`Switch`}
              labelPlacement="outside"
              selectedKeys={[subtype]}
              classNames={{
                listbox: "m-0 p-0",
                base: "!m-0 !p-0 ",
                mainWrapper: "p-0 m-0 !h-[34px]",
                trigger: "m-0 !bg-white !min-h-[34px] !max-w-[170px] pr-0 !text-sm !text-black  dark:!bg-[#2B2C2B] dark:!text-white !border-[#DFDFDF] !border !rounded-md",
                value: "m-0 !p-0 !text-sm !text-black dark:!text-white",
              }}
              radius="sm"
              onChange={handleSubDub}
              disallowEmptySelection={true}
            >
              {suboptions?.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </Select>
          </div>
        </div>
      </div>

      <div className='pb-8 h-auto'>
        {totalData > 0 ? (
          layout === 'list' ? (
            <ItemListDubbingVideo getVideo={getVideo} loading={loading} theme={theme} videos={filteredData} isWatched={isWatched} />
          ) : (
            <ItemDetailDubbingVideo getVideo={getVideo} loading={loading} theme={theme} videos={filteredData} isWatched={isWatched} />
          )
        ) : (
          <div className="flex items-center justify-center h-[100px]">
            <p>No Data Available</p>
          </div>
        )}
      </div>

    </>
  )
}

export default ListDubbingVideo