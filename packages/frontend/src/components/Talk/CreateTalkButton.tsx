import React, { useState } from "react";
import Modal from "react-modal";

import Input from "@/components/Auth/Input";
import talkInvitationAPI from "@/lib/api/talkInvitation";

const CreateTalkButton = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [inviteeEmail, setInviteeEmail] = useState<string>();
  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const invite = (event) => {
    void (async () => {
      event.preventDefault();
      const { status } = await talkInvitationAPI.inviteToTalkNotCreated(
        window.localStorage.getItem("accessToken")!,
        inviteeEmail!
      );
      if (status === 201) {
        closeModal();
      }
    })();
  };

  const modalStyles = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      backgroundColor: "rgba(0,0,0,0.3)",
    },

    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      max_width: "500px",
      max_height: "300px",
      width: "350px",
      transform: "translate(-50%, -50%)",
      padding: "24px",
    },
  };

  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={modalStyles}
      >
        <h2 className="mt-0 mb-2 text-2xl font-medium leading-tight text-gray-800">
          トークルームの作成
        </h2>
        <p className="mb-2 text-xs text-gray-300">
          招待された方が「Invitations」画面から招待を承認し次第、トークルームが作成されます。
          <br />
          招待が届いていない場合は、下記のメールアドレスが招待された方のアカウントのメールアドレスと一致しているかご確認下さい。
        </p>
        <form>
          <Input
            type="email"
            placeholder="招待するユーザーのメールアドレス"
            className="w-full"
            onChange={(event) => setInviteeEmail(event.target.value)}
          />
          <div className="mt-3 flex justify-between">
            <button
              type="submit"
              onClick={invite}
              className="rounded-md border border-transparent bg-gray-200 px-4 py-2 text-xs tracking-widest text-gray-800 transition duration-150 ease-in-out hover:bg-gray-300"
            >
              招待を送信
            </button>

            <button
              onClick={closeModal}
              className="rounded-md border border-transparent bg-gray-400 px-4 py-2 text-xs tracking-widest text-gray-800 transition duration-150 ease-in-out hover:bg-gray-300"
            >
              閉じる
            </button>
          </div>
        </form>
      </Modal>

      <button
        onClick={openModal}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500 text-white shadow-sm transition duration-150 ease-in-out hover:bg-red-600"
      >
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          ></path>
        </svg>
      </button>
    </>
  );
};

export default CreateTalkButton;
