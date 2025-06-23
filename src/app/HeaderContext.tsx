import { createContext } from 'react';

type HeaderContextType = {
  setLeftButtonState: React.Dispatch<React.SetStateAction<{on: boolean, text: string, icon: string, link: string}>>;
  setTextState: React.Dispatch<React.SetStateAction<string>>;
}

const HeaderContext = createContext<null | HeaderContextType>(null);
export default HeaderContext;
