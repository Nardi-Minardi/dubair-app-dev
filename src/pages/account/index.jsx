import React, { useEffect, useState, useRef } from 'react';
import AdminLayout from '@/layouts/adminLayout';
import MaintenanceComp from '@/components/elements/maintenanceComp';
import { fetchUser } from '@/store/slices/authSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { Tooltip } from '@nextui-org/react';
import UserDropdown from '@/components/layouts/adminLayout/userDropdown';
import { acumulatedDuration } from '@/utils/videoHook';
import { FaPencilAlt, FaLock } from 'react-icons/fa';
import { tokenAuth } from '@/utils/LocalStorage';
import ProfileInput from '@/components/elements/profilInput';
import { toast } from 'react-toastify';

const Account = () => {
  const imgRef = useRef(null);
  const dispatch = useDispatch();
  const router = useRouter();
  const [isEdit, setIsEdit] = useState(false);
  const [isChangePassword, setIsChangePassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imgPreview, setImgPreview] = useState(null);
  const { user } = useSelector((state) => state.auth);
  const [minutesAvailable, setMinutesAvailable] = useState(0);
  const [minutesUsed, setMinutesUsed] = useState(0);

  useEffect(() => {
    getDataMinutes();
  }
    , []);

  const getDataMinutes = () => {
    dispatch(fetchUser(tokenAuth())).then((res) => {
      if (res.payload.data) {
        setMinutesAvailable(res.payload.data.minutesAvailable);
        setMinutesUsed(res.payload.data.minutesUsed);
      }
    });
  }

  const secondToMinutes = (seconds) => {
    const minutes = Math.floor(seconds % 3600 / 60).toString().padStart(2, '0');
    const secondsLeft = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${minutes}.${secondsLeft}`;
  }

  const handleLogout = (e) => {
    console.log('logout')
    e.preventDefault();
    try {
      dispatch(logoutUser());
      router.push('/login');
    } catch (error) {
      console.log(error);
    }
  }

  const onEdit = () => {
    setIsEdit(!isEdit);
  }

  const onCancel = () => {
    setIsEdit(false);
    setIsChangePassword(false);
    setImgPreview(null);
  }

  const onPassword = () => {
    setIsChangePassword(!isChangePassword);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Profile updated successfully');
    setIsEdit(false);
    setIsChangePassword(false);
  }

  return (
    <div className="mt-6 py-2 sm:w-full">
      <div className="flex flex-col w-full h-full py-10 bg-white dark:bg-[#2B2C2B] rounded-xl shadow-md">

        <div className="flex flex-col h-full pt-5 mx-5 bg-white dark:bg-[#2B2C2B] rounded-xl border-2 border-[#F0F0F0]">
          <div className='justify-between flex flex-row gap-4 mx-5 mb-3'>
            <h5 className='text-2xl font-bold text-gray-800 dark:text-white'>My Profile</h5>

            {!isEdit && !isChangePassword && (
              <div className='justify-between flex flex-row gap-4 mx-5 mb-3'>
                <button
                  onClick={onPassword}
                  className=" bg-gradient-to-t from-[#9E0BF3] via-[#66B0FE] to-[#454FEC] text-white 
                  text-sm py-2 px-4 rounded-lg flex items-center">
                  <FaLock className="w-4 h-4 mr-2" />
                  Change Password
                </button>
              </div>
            )}
          </div>

          <div className={`flex flex-row gap-2 mt-2 mx-5 mb-3 ${!isEdit ? 'justify-between ' : ''}`}>

            <div className="flex flex-row items-start">
              <div className="relative">
                {imgPreview && (
                  <img src={imgPreview
                    ? imgPreview
                    : user?.image ? user.image : '/assets/images/avatar_profile.png'}
                    alt="avatar"
                    className="w-16 mr-1 aspect-square rounded-full" />
                )}

                {!imgPreview && (
                  <img src={user?.image ? user.image : '/assets/images/avatar_profile.png'}
                    alt="avatar"
                    className="w-16 mr-1 aspect-square rounded-full" />
                )}

                {isEdit && (
                  <div className="absolute cursor-pointer bottom-0 right-0 bg-white dark:bg-[#2B2C2B] p-1 rounded-full">
                    <img
                      onClick={() => imgRef.current.click()}
                      src="/assets/images/camera.png" alt="camera" className="w-4 h-4" />
                    <input
                      type="file"
                      ref={imgRef}
                      accept="image/*"
                      onChange={(e) => setImgPreview(URL.createObjectURL(e.target.files[0]))}
                      className="hidden"
                    />
                  </div>
                )}
              </div>

              {!isEdit && !isChangePassword && (
                <div className='flex flex-col w-32'>
                  <span className="text-lg md-max:w-20 w-32 truncate mt-1">
                    {user?.name}
                  </span>
                  <span className="font-extralight lg-max:text-sm md-max:w-20 w-40">
                    {user?.email}
                  </span>
                </div>
              )}
            </div>

            {!isEdit && !isChangePassword && (
              <div className='justify-between gap-2 mx-5 mb-3'>
                <button
                  onClick={onEdit}
                  className="bg-white dark:bg-[#2B2C2B] border-2 flex flex-row gap-2 items-center
            border-[#F0F0F0] outline-none cursor-pointer p-2 rounded-lg text-xs">
                  Edit
                  <FaPencilAlt className='text-gray-500 dark:text-gray-300' />
                </button>
              </div>
            )}

            {isEdit && (
              <div className='flex flex-col gap-2 w-full'>
                <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-4 w-full'>
                  <ProfileInput
                    label="Full Name"
                    type="text"
                    placeholder="full name"
                  />
                  <ProfileInput
                    label="Address"
                    type="text"
                    placeholder="address"
                  />
                </div>

                <div className="flex flex-row justify-end gap-4">
                  <button
                    onClick={onCancel}
                    className="bg-white dark:bg-[#2B2C2B] border-2 flex flex-row gap-2 items-center
                  border-[#F0F0F0] outline-none cursor-pointer px-2 py-0 rounded-lg text-xs">
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="bg-gradient-to-t from-[#9E0BF3] via-[#66B0FE] to-[#454FEC] text-white 
                  text-xs py-2 px-4 rounded-lg flex items-center">
                    Save
                  </button>
                </div>
              </div>
            )}

            {isChangePassword && (
              <div className='flex flex-col gap-2 w-full'>
                <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-4 w-full'>
                  <ProfileInput
                    label="New Password"
                    type="password"
                    placeholder="your new password"
                  />
                  <ProfileInput
                    label="Confirm Password"
                    type="password"
                    placeholder="your confirm password"
                  />
                </div>

                <div className="flex flex-row justify-end gap-4">
                  <button
                    onClick={onCancel}
                    className="bg-white dark:bg-[#2B2C2B] border-2 flex flex-row gap-2 items-center
                  border-[#F0F0F0] outline-none cursor-pointer px-2 py-0 rounded-lg text-xs">
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="bg-gradient-to-t from-[#9E0BF3] via-[#66B0FE] to-[#454FEC] text-white 
                  text-xs py-2 px-4 rounded-lg flex items-center">
                    Save
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>

        <div className='justify-between  mt-12  flex flex-row gap-4 mx-8 mb-3'>
          <h5 className='text-2xl font-bold text-gray-800 dark:text-white'>My Plan</h5>
          <div className='justify-between flex flex-row gap-4 mx-5 mb-3'>
            <span
              onClick={() => {
                router.push('/pricing')
              }
              }
              className=" my-text cursor-pointer">
              Upgrade Plan
            </span>
          </div>
        </div>

        <div className='flex flex-row gap-5 px-5 w-full'>
          <div className='flex flex-col gap-2 shadow-lg p-4 rounded-sm w-1/2'>
            <h1 className='text-2xl font-bold text-gray-800 dark:text-white'>Current Plan</h1>
            <p className='text-lg text-gray-500 dark:text-gray-300'>{user?.plan?.toUpperCase()}</p>
          </div>
          <div className='flex flex-col gap-2 shadow-lg p-4 rounded-sm w-1/2'>
            <h1 className='text-2xl font-bold text-gray-800 dark:text-white'>Minutes Available</h1>
            <p className='text-lg text-gray-500 dark:text-gray-300'>You have {" "}
              <span className='text-blue-500 font-bold'>{acumulatedDuration(minutesAvailable)} </span> / {" "}
              <span className='text-red-500 font-bold'>{acumulatedDuration(minutesUsed)} </span>
              minutes used</p>
          </div>
        </div>

        <div className='flex flex-row gap-5 px-5 mt-12 w-full'>
          <div className='flex flex-col gap-2 shadow-lg p-4 rounded-sm w-1/2'>
            <h1 className='text-2xl font-bold text-gray-800 dark:text-white'>Renewal Date</h1>
            <p className='text-lg text-gray-500 dark:text-gray-300'>
              {/* today */}
              {new Date(Date.now()).toLocaleDateString()}
            </p>
          </div>
          <div className='flex flex-col gap-2 shadow-lg p-4 rounded-sm w-1/2'>
            <h1 className='text-2xl font-bold text-gray-800 dark:text-white'>Rollover Minutes</h1>
            <p className='text-lg text-gray-500 dark:text-gray-300'>{secondToMinutes(minutesAvailable)} minutes</p>
          </div>
        </div>

      </div>
    </div>
  )
}

Account.getLayout = function getLayout(page) {
  return <AdminLayout title={"Account"}>{page}</AdminLayout>;
}

export default Account;