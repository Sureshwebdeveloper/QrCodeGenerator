import React, { useState } from "react";
import { MdDownload } from "react-icons/md";
import { BsQrCode } from "react-icons/bs";

const Qrcode = () => {
  const [image, setImg] = useState("");
  const [loading, setLoading] = useState(false);
  const [qrdata, setQrData] = useState("https://github.com/Sureshwebdeveloper");
  const [qrsize, setqrSize] = useState("150");

  async function generateQR() {
    setLoading(true);
    try {
      const url = `https://api.qrserver.com/v1/create-qr-code/?size=${qrsize}x${qrsize}&data=${encodeURIComponent(
        qrdata
      )}`;
      setImg(url);
    } catch (error) {
      console.error("Error Generating Your Qr Code", error);
    } finally {
      setLoading(false);
    }
  }

  function downloadQR() {
    fetch(image)
      .then((response) => response.blob())
      .then((blob) => {
        const atag = document.createElement("a");
        atag.href = URL.createObjectURL(blob);
        atag.download = "qrcode.png";
        document.body.appendChild(atag); //add
        atag.click();
        document.body.removedChild(atag); //remove
    });
    setTimeout(()=>{
        window.location.reload();
    },6000)
  }

  return (
    <div className="flex flex-col justify-center items-center  h-screen w-full ">
      <div
        className={
          "mx-3 rounded-3xl bg-slate-50  shadow-xl  drop-shadow-lg w-[400px] flex  flex-col items-center " +
          (loading && "h-[70%]")
        }
      >
        <h1 className="text-red-600 font-extrabold text-lg mt-3">
          Qr Code Generator
        </h1>
        {loading ? (
          <p className="">Please Wait...</p>
        ) : (
          <p className=" py-2 text-md font-mono font-semibold text-[#494949]"> <span className="text-blue-700 font-serif font-semibold">Hint: </span>Replace Url And Click Generate</p>
        )}
        {image && (
          <img src={image} alt="" className="h-[200px] w-[200px] text-center rounded-lg" />
        )}
        <label htmlFor="datainput" className=" font-semibold ">Data For Qr Code:</label>
        <input
          type="text"
          id="datainput"
          value={qrdata}
          onChange={(e) => setQrData(e.target.value)}
          disabled={loading}
          placeholder="Enter Your Data"
          className="input-base  w-[80%] text-center place-holder-red-400 rounded-md h-[40px]"
        />
        <br />
        <label htmlFor="sizeinput" className=" font-semibold ">Image Size Ex:(150)</label>
        <input
          type="text"
          id="sizeinput"
          value={qrsize}
          onChange={(e) => setqrSize(e.target.value)}
          placeholder="Enter Your Size"
          className="input-base w-[80%] text-center place-holder-red-400 rounded-md h-[40px]"
        />
        <div className="flex items-center justify-bettween">
          <button className="btn-base bg-green-800" onClick={generateQR}>
            Generate QR <BsQrCode className="ml-2 text-xl" />
          </button>
          <button className="btn-base  bg-red-800 " onClick={downloadQR}>
            Download QR <MdDownload className="ml-2 text-xl" />
          </button>
        </div>
      </div>
      
    </div>
  );
};

export default Qrcode;
