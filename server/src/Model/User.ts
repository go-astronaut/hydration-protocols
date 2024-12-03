import { get, child, set, ref } from "firebase/database";
import { db, dbRef } from "../Firebase/FirebaseConfig";

const userModel = {
  get: async (uid: string) => {
    return get(child(dbRef, `${uid}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          return snapshot.val();
        }
        return null;
      })
      .catch((error) => {
        // TODO: error handling
        console.error(error);
        return null;
      });
  },

  set: async (data: any, uid: string) => {
    await set(ref(db, `/${uid}`), data);
  },
};

export { userModel };
