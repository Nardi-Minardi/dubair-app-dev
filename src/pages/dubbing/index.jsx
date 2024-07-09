import React, { useEffect, useState, useRef } from 'react'
import AdminLayout from '@/layouts/adminLayout';
import { useTranslations } from 'next-intl';
import DragDropFiles from '@/components/inputs/dragDropFiles';
import ButtonGradient from '@/components/buttons/buttonGradient';
import ListDubbingVideo from '@/components/dubbing/listDubbingVideo';
import { useDispatch } from 'react-redux';
import { fetchVideo } from '@/store/slices/videoSlice';
import { toast } from 'react-toastify'
import { get_filesize } from '@/utils/videoHook';
import axios from 'axios';
import ytdl from 'ytdl-core';
import { API_KEY_FIREBASE, API_KEY_GDRIVE, GOOGLE_CLIENT_ID } from '@/config';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, RadioGroup, Radio } from "@nextui-org/react";
import ListDocumentGdrive from '@/components/elements/listDocumentGdrive';
import { fetchUser } from '@/store/slices/authSlice';
import { useSelector } from 'react-redux';

const Dubbing = () => {
  const t = useTranslations('Dubbing');
  const dispatch = useDispatch()
  const gdriveRef = useRef(null)
  const [fileFromLink, setFileFromLink] = useState('')
  const [typeFromLink, setTypeFromLink] = useState('')
  const [isYoutube, setIsYoutube] = useState(false)
  const [source, setSource] = useState('')
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [scrollBehavior, setScrollBehavior] = useState("inside");
  const {user} = useSelector((state) => state.auth)

  const [listDocumentsVisible, setListDocumentsVisibility] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [isLoadingGoogleDriveApi, setIsLoadingGoogleDriveApi] = useState(false);
  const [isFetchingGoogleDriveFiles, setIsFetchingGoogleDriveFiles] = useState(false);
  const [signedInUser, setSignedInUser] = useState(null);

  useEffect(() => {
    getVideo()
    fetchUser()
  }, [])

  const getVideo = () => {
    try {
      dispatch(fetchVideo())
    } catch (error) {
      console.log(error)
    }
  }


  const extractYouTubeVideoId = (url) => {
    let regex = /(youtu.*be.*)\/(watch\?v=|embed\/|v|shorts|)(.*?((?=[&#?])|$))/gm;
    return Promise.resolve(url.match(regex)[0].split('=')[1])
  }

  const handleUploadFromLink = (e) => {
    if (!source) {
      toast.error('Please enter the link', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setFileFromLink('')
      return
    }

    if(user?.minutesAvailable <= 0) {
      toast.error('You have no minutes available, please upgrade your plan', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return
    }

    //validate is a format video from link
    const formatAllowed = new Map([["mp4", "video"], ["mov", "video"], ["m4v", "video"], ["webm", "video"], ["youtube", "iframe"]]);
    const extension = source.split('.').pop();
    //check if source from youtube or not
    if (source.includes('youtube')) {
      extractYouTubeVideoId(source).then((resId) => {

        setIsYoutube(true)
        setTypeFromLink('youtube')
      })


    }

    setTypeFromLink(extension)
    // const isFormat = formatAllowed.has(extension);
    if (!formatAllowed.has(extension) && !source.includes('youtube')) {
      toast.error('Please enter a video link', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setFileFromLink('')
      return
    }

    get_filesize(source, function (size) {
      const zSize = (size / 1024 / 1024 / 1024).toFixed(2);
      console.log('zSize', zSize)
      const maxSizeFree = 5;
      if (zSize > maxSizeFree) {
        toast.error('Please select a video file less than 5GB', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setFileFromLink('')
        return
      }
    });

    const element = document.createElement(formatAllowed.get(extension));
    element.src = source;

    if (element.src) {
      setFileFromLink(source)
    }
  }

  const handleUploadFromtGooggleDrive = async () => {
    const gapi = await import('gapi-script').then((pack) => pack.gapi);
    setIsLoadingGoogleDriveApi(true);
    gapi.load('client:auth2', async () => {
      await gapi.client.init({
        apiKey: API_KEY_GDRIVE,
        clientId: GOOGLE_CLIENT_ID,
        discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"],
        scope: 'https://www.googleapis.com/auth/drive.file',
      });

      gapi.client.load('drive', 'v3', () => {
        gapi.auth2.getAuthInstance().signIn().then(() => {
          // const user = gapi.auth2.getAuthInstance().currentUser.get();
          updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
          onOpen();
        });
      });
    });
  };

  const updateSigninStatus = (isSignedIn) => {
    if (isSignedIn) {
      // Set the signed in user
      setSignedInUser(gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile());
      const token = gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().access_token;
      setIsLoadingGoogleDriveApi(false);
      // list files if user is authenticated
      listFiles(null, token);
    } else {
      // prompt user to sign in
      handleAuthClick();
    }
  };

  const handleAuthClick = (event) => {
    gapi.auth2.getAuthInstance().signIn();
  };

  const listFiles = (searchTerm, token) => {
    setIsFetchingGoogleDriveFiles(true);
    axios.get('https://www.googleapis.com/drive/v3/files', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        pageSize: 10,
        fields: 'nextPageToken, files(id, name, mimeType, modifiedTime, videoMediaMetadata, webViewLink, webContentLink)',
        q: searchTerm,
      }
    }).then((response) => {
      console.log('response file gdrive', response)
      setIsFetchingGoogleDriveFiles(false);
      setListDocumentsVisibility(true);
      const data = response.data.files;
      const formatAllowed = new Map([["mp4", "video"], ["mov", "video"], ["m4v", "video"], ["webm", "video"], ["youtube", "iframe"]]);
      //return only video files mime type
      const newData = data.filter((item) => {
        return formatAllowed.has(item.mimeType.split('/')[1])
      })
      setDocuments(newData);
    }).catch((error) => {
      console.log(error)
    });
  };

  const showDocuments = () => {
    setListDocumentsVisibility(true);
  };

  const onClose = () => {
    setListDocumentsVisibility(false);
    setDocuments([]);
  };

  const handleSignOutClick = (event) => {
    setListDocumentsVisibility(false);
    setDocuments([]);
    gapi.auth2.getAuthInstance().signOut();
  };

  return (
    <>
      <div className="mt-6 py-2 sm:w-full flex flex-col gap-6">

        <div className="flex w-full py-10 bg-white dark:bg-[#2B2C2B] rounded-sm">
          <div className="px-8 m-auto w-screen">
            <DragDropFiles
              title={t('langTitleUpload')}
              desc={t('langDescUpload')}
              fileFromLink={fileFromLink}
              setFileFromLink={setFileFromLink}
              typeFromLink={typeFromLink}
              setTypeFromLink={setTypeFromLink}
              handleUploadFromGoogleDrive={handleUploadFromtGooggleDrive}
              gdriveRef={gdriveRef}
              user={user}
            />
            {/* OR */}
            <div className="flex items-center justify-center gap-2 mt-4">
              <div className="w-full h-0.5 bg-gray-300"></div>
              <p className="text-gray-500">OR</p>
              <div className="w-full h-0.5 bg-gray-300"></div>
            </div>

            <div className="flex h-10 flex-row align-center justify-between gap-2 mt-4">
              <input
                value={source}
                onChange={(e) => setSource(e.target.value)}
                placeholder={t('langPlaceholderUpload')}
                type="url"
                className="my-input h-10 pl-3 w-full rounded-[12px] bg-white text-md text-gray-700 outline-none" />

              <ButtonGradient
                title={t('langBtnUpload')}
                radius="rounded-md"
                type="button"
                whiteSpace="whitespace-nowrap"
                onClick={() => {
                  handleUploadFromLink()
                }}
              />
            </div>

          </div>
        </div>

        <div className="flex w-full py-10 bg-white dark:bg-[#2B2C2B] rounded-sm">
          <div className="px-8 m-auto w-screen">
            <ListDubbingVideo
              getVideo={getVideo}
            />
          </div>
        </div>
      </div>
      <ListDocumentGdrive
        visible={listDocumentsVisible}
        onClose={onClose}
        documents={documents}
        onSearch={listFiles}
        signedInUser={signedInUser}
        isLoading={isFetchingGoogleDriveFiles}
        onSignOut={handleSignOutClick}
      />
    </>
  )
}

Dubbing.getLayout = function getLayout(page) {
  return <AdminLayout title={"Dubbing"}>{page}</AdminLayout>;
}

export async function getStaticProps({ locale }) {
  console.log(locale);
  return {
    props: {
      messages: (await import(`../../../locales/${locale}.json`)).default,
    }
  };
}


export default Dubbing;

