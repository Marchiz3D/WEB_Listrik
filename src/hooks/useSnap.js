import { useState, useEffect, action } from "react";

const useSnap = () => {
  const [snap, setSnap] = useState(null);

  useEffect(() => {
    // You can also change below url value to any script url you wish to load, 
    // for example this is snap.js for Sandbox Env (Note: remove `.sandbox` from url if you want to use production version)
    const midtransScriptUrl = 'https://app.sandbox.midtrans.com/snap/snap.js';

    let scriptTag = document.createElement('script');
    scriptTag.src = midtransScriptUrl;

    // Optional: set script attribute, for example snap.js have data-client-key attribute 
    // (change the value according to your client-key)
    const myMidtransClientKey = 'SB-Mid-client-TDCVIaTjhung2zl9';
    scriptTag.setAttribute('data-client-key', myMidtransClientKey);
    scriptTag.onload = () => {
      setSnap(window.snap);
    }

    document.body.appendChild(scriptTag);

    return () => {
      document.body.removeChild(scriptTag);
    }
  }, []);
  const embededSnap = (snapToken, embedId, action) => {
    if (snap) {
      snap.embed(snapToken, {
        embedId,
        onSuccess: function (result) {
          /* You may add your own implementation here */
          action.onSuccess(result);
        },
        onPending: function (result) {
          /* You may add your own implementation here */
          action.onPending(result);
        },
        onError: function (result) {
          /* You may add your own implementation here */
          action.onError(result);
        },
        onClose: function () {
          /* You may add your own implementation here */
          action.onClose();
        }
      })
    }
  }
  return { embededSnap }
}


export default useSnap;