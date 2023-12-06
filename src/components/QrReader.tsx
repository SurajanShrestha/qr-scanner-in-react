import { useEffect, useRef, useState } from "react";

// Qr Scanner
import QrScanner from "qr-scanner";
import QrFrame from "../assets/qr-frame.svg";

const QrReader = () => {
  // QR States
  const scanner = useRef<QrScanner>();
  const videoEl = useRef<HTMLVideoElement>(null);
  const qrBoxEl = useRef<HTMLDivElement>(null);
  const [qrOn, setQrOn] = useState<boolean>(true);

  // Success
  const onScanSuccess = (result: QrScanner.ScanResult) => {
    // Handle success
    // if (handleSuccess) {
    //   handleSuccess(result);
    // }
    console.log(result);
  };

  // Fail
  const onScanFail = (err: string | Error) => {
    // if (err && handleFailure) {
    //   handleFailure(err);
    // }
    console.log(err);
  };

  useEffect(() => {
    // Instantiate the QR Scanner
    if (videoEl?.current && !scanner.current) {
      scanner.current = new QrScanner(videoEl?.current, onScanSuccess, {
        onDecodeError: onScanFail,
        preferredCamera: "environment",
        highlightScanRegion: true,
        highlightCodeOutline: true,
        overlay: qrBoxEl?.current || undefined,
      });

      // Start QR Scanner
      scanner?.current
        ?.start()
        .then(() => setQrOn(true))
        .catch((err) => {
          if (err) setQrOn(false);
        });
    }

    // Clean up on unmount
    return () => {
      // eslint-disable-next-line
      if (!videoEl?.current) {
        scanner?.current?.stop();
      }
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div className="qr-reader">
      {/* QR */}
      <video ref={videoEl}></video>
      <div ref={qrBoxEl} className="qr-box">
        <img
          src={QrFrame}
          alt="Qr Frame"
          width={256}
          height={256}
          className="qr-frame"
        />
      </div>
    </div>
  );
};

export default QrReader;
