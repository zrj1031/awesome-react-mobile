import { useEffect } from 'react';

function useLock(shouldLock: boolean) {
  const BODY_LOCK_CLASS = 'fm-overflow-hidden';

  useEffect(() => {
    if (shouldLock) {
      document.body.classList.add(BODY_LOCK_CLASS);
    } else {
      document.body.classList.remove(BODY_LOCK_CLASS);
    }
  }, [shouldLock]);
}

export default useLock;
