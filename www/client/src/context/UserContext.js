import { createContext, useContext, useState } from "react";

const NameContext = createContext();
const NameUpdateContext = createContext();
const AvatarContext = createContext();
const AvatarUpdateContext = createContext();

export const UserProvider = ({ children }) => {
  const [name, updateName] = useState("");
  const [avatar, updateAvatar] = useState("");

  return (
    <NameContext.Provider value={name}>
      <NameUpdateContext.Provider value={updateName}>
        <AvatarContext.Provider value={avatar}>
          <AvatarUpdateContext.Provider value={updateAvatar}>
            {children}
          </AvatarUpdateContext.Provider>
        </AvatarContext.Provider>
      </NameUpdateContext.Provider>
    </NameContext.Provider>
  );
};

export const useName = () => {
  return useContext(NameContext);
};

export const useNameUpdate = () => {
  return useContext(NameUpdateContext);
};

export const useAvatarContext = () => {
  return useContext(AvatarContext);
};

export const useAvatarUpdate = () => {
  return useContext(AvatarUpdateContext);
};

export default UserProvider;
