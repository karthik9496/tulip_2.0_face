function Modal({ setOpenModal, children, heading }) {
  return (
    <main
      className="fixed top-1/4 w-1/2 z-50 p-6 bg-white rounded-xl justify-center items-center"
      style={{ boxShadow: "5px 5px 20px" }}
    >
      <div className=" flex justify-end">
        <button
          className="w-6 text-black font-extrabold text-lg  border-2 border-black  bg-red-500 hover:bg-red-600 transform duration-200 hover:scale-105"
          style={{ boxShadow: "2px 2px 2px" }}
          onClick={() => setOpenModal(false)}
        >
          X
        </button>
      </div>
      <div className="text-red-500 text-center py-2 font-bold text-3xl mb-4">
        <u>{heading}</u>
      </div>
      <div className="font-medium text-lg text-green-500">{children}</div>
      <div className="flex justify-end">
        <button
          className="mt-2 h-10 w-32  border rounded-lg text-black bg-yellow-400 hover:bg-yellow-600 transform duration-200 hover:scale-105"
          style={{ boxShadow: "5px 5px 5px" }}
          onClick={() => setOpenModal(false)}
        >
          Continue
        </button>
      </div>
    </main>
  );
}

export default Modal;
