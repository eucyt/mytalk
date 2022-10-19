import React, { useState } from "react";
import Modal from "react-modal";

import Input from "@/components/Auth/Input";
import talkInvitationAPI from "@/lib/api/talkInvitation";

interface Props {
  talkId: number;
}

const InviteButton: React.FC<Props> = (props) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [inviteeEmail, setInviteeEmail] = useState<string>();

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
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

  // TODO: トークルームの作成時に招待をする。招待承認時にトークルームを作成する。後から招待できるような拡張性も考える。大体これを/talksに移動する
  const invite = (event) => {
    void (async () => {
      event.preventDefault();
      const { status } = await talkInvitationAPI.invite(
        window.localStorage.getItem("accessToken")!,
        inviteeEmail!,
        props.talkId
      );
      if (status === 201) {
        closeModal();
      }
    })();
  };

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className="rounded-lg border p-3 text-gray-500 transition duration-500 ease-in-out hover:bg-gray-300 focus:outline-none"
      >
        招待
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={modalStyles}
      >
        <h2 className="mt-0 mb-2 text-4xl font-medium leading-tight text-gray-800">
          ユーザーの招待
        </h2>
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
    </>
  );
};

export default InviteButton;
